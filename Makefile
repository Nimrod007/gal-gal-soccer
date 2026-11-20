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
