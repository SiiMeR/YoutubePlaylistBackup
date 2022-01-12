export const replaceLine = (replacement: string): void => {
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
    process.stdout.write(replacement);
}