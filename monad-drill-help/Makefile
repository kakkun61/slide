index.html: slide.md theme.css package.json package-lock.json
	npm run make

.PHONY: pages
pages: index.html
	npm run pages $(OUT_DIR)

.PHONY: head
head:
	git rev-parse HEAD

.PHONY: clean
clean:
	-pwsh -Command "& { Remove-Item index.html }"
