#!/bin/sh

rm -rf out
tsc src/* --outDir out/js --target es2017 --lib es2015,dom