import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export const processVideoWithBackground = async (
    file: File,
    color: string,
    ffmpeg: FFmpeg,
    onLog?: (message: string) => void
): Promise<Blob | null> => {
    if (!file) return null;

    try {
        // Add logging
        ffmpeg.on("log", ({ message }) => {
            if (onLog) onLog(message);
            // console.log("FFmpeg Log:", message);
        });

        // Load FFmpeg (only if not loaded)
        if (!ffmpeg.loaded) {
            console.log("Loading FFmpeg...");
            // We load the core assets from a CDN (unpkg) to avoid large bundle sizes
            // Use UMD build to avoid ESM blob URL resolution issues
            const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
            await ffmpeg.load({
                coreURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.js`,
                    "text/javascript"
                ),
                wasmURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.wasm`,
                    "application/wasm"
                ),
            });
            // console.log("FFmpeg loaded.");
        }

        // Prepare Data
        // Convert CSS Hex (#FF0000) to FFmpeg color format (0xFF0000)
        const ffmpegColor = color.replace("#", "0x");

        // Get file extension and type
        const fileExtension = file.name.split(".").pop();
        const inputName = `input.${fileExtension}`;
        const outputName = `output.${fileExtension}`;
        const mimeType = file.type;

        // Write the current file to FFmpeg's virtual file system
        await ffmpeg.writeFile(inputName, await fetchFile(file));

        // Run FFmpeg Command
        // -vf (Video Filter):
        // pad=iw+40:ih+40:20:20:color=...
        // means: new width = input width + 40, new height = input height + 40,
        // position input at x=20, y=20, fill the rest with color.
        // console.log("Starting FFmpeg processing...");
        await ffmpeg.exec([
            "-i",
            inputName,
            "-vf",
            `pad=iw+80:ih+80:40:40:color=${ffmpegColor}`,
            "-c:a",
            "copy", // Copy audio without processing (faster)
            outputName,
        ]);
        // console.log("FFmpeg processing complete.");

        // Read the result
        const data = (await ffmpeg.readFile(outputName)) as Uint8Array;

        // Create new Blob
        const newVideoBlob = new Blob([data.buffer as ArrayBuffer], { type: mimeType });
        return newVideoBlob;

    } catch (error) {
        console.error("Error processing video:", error);
        throw error;
    }
};
