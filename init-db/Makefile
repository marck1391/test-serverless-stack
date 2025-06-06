build-InitDbFunction:
	npm install
	npx esbuild app.ts --bundle --platform=node --target=es2020 --outfile=$(ARTIFACTS_DIR)/app.js --minify --sourcemap
	mkdir -p $(ARTIFACTS_DIR)/sql
	cp -r ../sql/* $(ARTIFACTS_DIR)/sql