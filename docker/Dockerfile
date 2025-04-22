# 4.0.7 works
# watch https://github.com/emscripten-core/emscripten/blob/main/ChangeLog.md
FROM emscripten/emsdk:latest

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
# 4.0.7 no HEAP8,HEAPU32 export by default
RUN sed -i "s/SO_LDFLAGS += -s EXPORTED_FUNCTIONS=\"\['_malloc','_free'\]\"/SO_LDFLAGS += -s EXPORTED_FUNCTIONS=\"\['_malloc','_free','stackAlloc','stackSave','stackRestore','UTF8ToString','HEAP8','HEAPU32'\]\" -s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=\"['stackAlloc','stackSave','stackRestore']\"/g" build/make/config-emscripten.mk

# build
RUN make CONFIG=emscripten EMSCRIPTEN_TARGET=audioworkletprocessor

# add tersered polyfills.js
RUN sed -i '1 i\function atob(r){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";let e,o,n,a,c,h,d,f="",i=0;r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{a=t.indexOf(r.charAt(i++)),c=t.indexOf(r.charAt(i++)),h=t.indexOf(r.charAt(i++)),d=t.indexOf(r.charAt(i++)),e=a<<2|c>>4,o=(15&c)<<4|h>>2,n=(3&h)<<6|d,f+=String.fromCharCode(e),64!==h&&(f+=String.fromCharCode(o)),64!==d&&(f+=String.fromCharCode(n))}while(i<r.length);return f}const performance={now:()=>Date.now()};const crypto={getRandomValues(r){for(let t=0;t<r.length;t++)r[t]=256*Math.random()|0}};' bin/libopenmpt.js
