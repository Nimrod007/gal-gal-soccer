# Build for the ELECFREAKS Retro Arcade (STM32F4) and flash it.
# Put the device in bootloader mode first (double-tap reset -> ARCADE-F4 drive appears).
HW = stm32f401
DRIVE = /Volumes/ARCADE-F4

all: deploy

build:
	pxt build --hw $(HW)

deploy: build
	@test -d $(DRIVE) || (echo "Device not found: double-tap reset on the Arcade so $(DRIVE) appears" && exit 1)
	cp built/binary.uf2 $(DRIVE)/
	@echo "Flashed! The game will start on the device."

test:
	pxt test

# Update the playable web page (GitHub Pages runs assets/js/binary.js in the MakeCode simulator)
web:
	cp pxt.json /tmp/pxt.json.web && python3 -c "import json;p=json.load(open('pxt.json'));p['dependencies'].pop('hw---stm32f401',None);json.dump(p,open('pxt.json','w'),indent=4)"
	pxt build || (cp /tmp/pxt.json.web pxt.json && exit 1)
	cp /tmp/pxt.json.web pxt.json
	( echo '// meta={"simUrl":"https://trg-arcade.userpxt.io/v4.2.1/---simulator","cdnUrl":"https://cdn.makecode.com","version":"0.0.0","target":"arcade","targetVersion":"4.2.1"}'; cat built/debug/binary.js ) > assets/js/binary.js
