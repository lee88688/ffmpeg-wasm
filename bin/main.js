const fs = require('fs/promises');
const createFFmpegCore = require('./ffmpeg-core');

const parseArgs = (Core, args) => {
  const argsPtr = Core._malloc(args.length * Uint32Array.BYTES_PER_ELEMENT);
  args.forEach((s, idx) => {
    const buf = Core._malloc(s.length + 1);
    Core.writeAsciiToMemory(s, buf);
    Core.setValue(argsPtr + (Uint32Array.BYTES_PER_ELEMENT * idx), buf, 'i32');
  });
  return [args.length, argsPtr];
};

const ffmpeg = (Core, args) => {
  Core.ccall(
    'main',
    'number',
    ['number', 'number'],
    parseArgs(Core, ['ffmpeg', ...args]),
  );
};

async function main() {
  console.log('before')
  const Core = await createFFmpegCore({
    printErr: (m) => {
      console.log(m);
    },
    print: (m) => {
      console.log(m);
    },
  });
  const file = await fs.readFile('small_bunny_1080p_60fps.mp4');
  Core.FS.writeFile('1.mp4', file);
  console.log('after')
  ffmpeg(Core, ["1.mp4"]);
  const f = Core.FS.readFile('frame-1.pgm');
  await fs.writeFile('frame-1.pgm', f);
}

main()