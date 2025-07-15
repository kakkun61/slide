OUT_DIR ?= out

.PHONY: all
all:
	@mkdir -p $(OUT_DIR)
	(cd gotanda.hs-1 && make index.html && make pages OUT_DIR=../$(OUT_DIR))
	(cd linear-ephemeral-data-structure && make index.html && make pages OUT_DIR=../$(OUT_DIR))
	(cd monad-drill-help && make index.html && make pages OUT_DIR=../$(OUT_DIR))
	(cd ppl-2025 && make index.html && make pages OUT_DIR=../$(OUT_DIR))

.PHONY: all.windows
all.windows:
	@pwsh -Command "& { New-Item -ItemType Directory -Path $(OUT_DIR) }"
	(cd gotanda.hs-1 && make index.html && make pages OUT_DIR=../$(OUT_DIR))
	(cd linear-ephemeral-data-structure && make index.html && make pages OUT_DIR=../$(OUT_DIR))
	(cd monad-drill-help && make index.html && make pages OUT_DIR=../$(OUT_DIR))
	(cd ppl-2025 && make index.html && make pages OUT_DIR=../$(OUT_DIR))

.PHONY: prepare
prepare:
	(cd gotanda.hs-1 && npm install)
	(cd linear-ephemeral-data-structure && npm install)
	(cd monad-drill-help && npm install)
	(cd ppl-2025 && npm install)

.PHONY: clean
clean:
	-rm -rf $(OUT_DIR)

.PHONY: clean.windows
clean.windows:
	-pwsh -Command "& { Remove-Item -Recurse -Force $(OUT_DIR) }"
