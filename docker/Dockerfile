# watch https://github.com/emscripten-core/emscripten/blob/main/ChangeLog.md
#FROM emscripten/emsdk:latest
FROM emscripten/emsdk:6.0.0

ARG BASE
ARG FILE

# update / install
RUN apt update -y && apt upgrade -y && apt install pkg-config -y

# download
RUN wget $BASE$FILE.makefile.tar.gz

# unpack
RUN mkdir libopenmpt && tar xzvf $FILE.makefile.tar.gz -C ./libopenmpt --strip-components=1

WORKDIR /src/libopenmpt

# next line updates EXPORTED_FUNCTIONS and since 3.1.57 DEFAULT_LIBRARY_FUNCS_TO_INCLUDE
# 4.0.7 no HEAPxxx export by default
# HEAP32 + wasmTable: needed to call libopenmpt_ext interface function pointers (channel mute)
RUN sed -i "s/SO_LDFLAGS += -s EXPORTED_FUNCTIONS=\"\['_malloc','_free'\]\"/SO_LDFLAGS += -s EXPORTED_FUNCTIONS=\"\['_malloc','_free','stackAlloc','stackSave','stackRestore','UTF8ToString'\]\" -s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=\"\['stackAlloc','stackSave','stackRestore'\]\" -s EXPORTED_RUNTIME_METHODS=\"\['HEAP8','HEAPU8','HEAP32','HEAPF32','wasmTable'\]\"/g" build/make/config-emscripten.mk

# build
RUN make CONFIG=emscripten EMSCRIPTEN_TARGET=audioworkletprocessor

# add tersered polyfills.js
RUN sed -i '1 i\function atob(r){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";let e,o,n,a,c,h,d,f="",i=0;r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{a=t.indexOf(r.charAt(i++)),c=t.indexOf(r.charAt(i++)),h=t.indexOf(r.charAt(i++)),d=t.indexOf(r.charAt(i++)),e=a<<2|c>>4,o=(15&c)<<4|h>>2,n=(3&h)<<6|d,f+=String.fromCharCode(e),64!==h&&(f+=String.fromCharCode(o)),64!==d&&(f+=String.fromCharCode(n))}while(i<r.length);return f}const performance={now:()=>Date.now()};const crypto={getRandomValues(r){for(let t=0;t<r.length;t++)r[t]=256*Math.random()|0}};const TextDecoder={decode:o=>{let e="",r=0;const t=o.length;for(;r<t;){let t=o[r++];if(!(128&t)){e+=String.fromCharCode(t);continue}const n=63&o[r++];if(192==(224&t)){e+=String.fromCharCode((31&t)<<6|n);continue}const c=63&o[r++];if(t=224==(240&t)?(15&t)<<12|n<<6|c:(7&t)<<18|n<<12|c<<6|63&o[r++],t<65536)e+=String.fromCharCode(t);else{const o=t-65536;e+=String.fromCharCode(55296|o>>10,56320|1023&o)}}return e}};' bin/libopenmpt.js
# 4.0.9 also use TextDecoder polyfill
RUN sed -i "s/var UTF8Decoder=new TextDecoder/var UTF8Decoder=TextDecoder/g" bin/libopenmpt.js
