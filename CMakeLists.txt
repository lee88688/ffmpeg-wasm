cmake_minimum_required(VERSION 3.21)
project(ffmpeg-wasm)

# set out direcroty
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_SOURCE_DIR}/bin)

add_executable(ffmpeg-core main.cpp)

target_include_directories(ffmpeg-core PUBLIC ${CMAKE_SOURCE_DIR}/libs/include)

message(STATUS ${CMAKE_SOURCE_DIR}/libs/include)

# find_library(tt NAMES avutil PATHS "${CMAKE_SOURCE_DIR}/ffmpeg/lib" REQUIRED NO_CACHE)

file(GLOB libraries ${CMAKE_SOURCE_DIR}/libs/lib/*.a)

target_link_libraries(ffmpeg-core ${libraries})

# copy test file
file(COPY ${CMAKE_SOURCE_DIR}/small_bunny_1080p_60fps.mp4 DESTINATION ${CMAKE_SOURCE_DIR}/bin)
# file(COPY ${CMAKE_SOURCE_DIR}/main.js DESTINATION ${CMAKE_BINARY_DIR}/bin)

set(link_flags "-s USE_SDL=2 -s INVOKE_RUN=0 -s EXIT_RUNTIME=1 -s MODULARIZE=1 -s EXPORT_NAME=createFFmpegCore -s EXPORTED_FUNCTIONS=_main -s EXPORTED_RUNTIME_METHODS=FS,cwrap,ccall,setValue,writeAsciiToMemory")
set(link_flags "${link_flags} -s INITIAL_MEMORY=2146435072 -pthread -s USE_PTHREADS=1 -s PROXY_TO_PTHREAD=1 --pre-js ${CMAKE_SOURCE_DIR}/wasm/src/pre.js --post-js ${CMAKE_SOURCE_DIR}/wasm/src/post.js")

set_target_properties(ffmpeg-core PROPERTIES LINK_FLAGS ${link_flags})