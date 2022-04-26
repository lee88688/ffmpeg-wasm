本项目的目的是将[ffmpeg wasm](https://github.com/ffmpegwasm/ffmpeg.wasm-core)的ffmpeg程序改为自定义程序，可以自行编写基于ffmpeg的wasm程序。

## 编译要求
- emscripten版本`2.0.24`

项目中已经预编译了ffmpeg的lib（`libs`文件夹下），和`ffmpeg wasm`项目的编译流程相同，最后一步编译ffmpeg的时候使用`make install`生成静态链接库和头文件，在链接的时候需要将ffmpeg所有编译过程的库一起拷贝链接才可以。