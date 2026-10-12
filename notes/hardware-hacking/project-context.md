# Hardware Hacking Project — Context

This is planning/reference material for the Hardware Hacking section, not a published post yet.
Source: originally generated via a Claude.ai chat handoff, dated 2026-09-29.

## Who this is for / goal

Transitioning from web application security into hardware hacking. Learn by building tools
where practical, rather than immediately buying every commercial tool. Commercial tools stay
on a wishlist as future upgrades/reference — DIY builds come first wherever they teach useful
fundamentals.

General approach:
- Prefer practical learning projects over buying equipment immediately.
- Build tools when the DIY version teaches useful concepts.
- Keep commercial tools on the wishlist as future upgrades/reference tools.
- Buy specialized equipment only when an actual project demonstrates it's needed.
- Progression: basic digital signals → protocols → debugging/interfaces → firmware/storage → advanced fault injection.

## Current project: Project 1 — RP2040 DIY Logic Analyzer

Concept: RP2040 → GPIO inputs → sample digital signals → USB → PC → waveform/data.

Planned versions (build in order, don't skip ahead):
- V1: Basic GPIO/digital sampler (read pin states) — **not started yet**
- V2: USB streaming
- V3: Triggering
- V4: UART decoder
- V5: SPI decoder
- V6: I2C decoder
- V7: PIO-based high-speed capture (why C/C++ + Pico SDK over MicroPython/Arduino — PIO needs the SDK for real performance)
- V8: Multi-channel capture + PC interface

Toolchain: C/C++ with the official Pico SDK, via the official Raspberry Pi Pico VS Code
extension (publisher: Raspberry Pi, marketplace id `raspberry-pi.raspberry-pi-pico`).

Do not design Project 1 around the future camera target (see below) — it should remain a
general-purpose tool built on its own merits.

## Status

Toolchain setup blocked: VS Code is too old for the Pico extension (needs 1.105.1+). Once
updated: create a Pico project via the extension, build + flash the stock "blink" example as
an end-to-end sanity check, then write V1 (GPIO input sampler, no USB streaming/decoding yet).

## Future target (out of scope for Project 1)

Canon PowerShot A570 IS — a real-world hardware-hacking target planned for later, after
fundamentals are learned. Do not scope Project 1 around it or buy equipment specifically
because of it yet.

## Hardware inventory

### Core / basic
- Multimeter; fine needle multimeter probes
- 4-pack 2mm extended multimeter needle test probes, 600V/10A (DeeCam) — second/upgrade set
- 4x RP2040 Pico-compatible dev boards (2 original + 2 from a Shutao 2-pack)
- BOJACK 37-value 480-pc electronics component kit — fixed 3.3V/5V power module (not
  adjustable/current-limited), jumper wires, precision potentiometer, 830 tie-point breadboard,
  resistor/capacitor/component assortment
- Dupont jumper wires; pin headers; test-hook micro grabbers
- Goupchn 10-pc test hook clip to breadboard male jumper wires
- Precision screwdriver set; STREBITO 142-piece precision screwdriver set (supersedes original)

### Soldering / rework
- WEP 882D soldering + hot-air station (2 spools solder, 5 tips, 3 hot-air nozzles, brass wool
  tip cleaner, tweezers, desoldering pump included)
- Helping-hands station (original) + XYK 4-arm helping hands station (second/backup)
- KOTTO solder fume extractor w/ 2 magnetic helping-hands arms, 5 carbon filters
- Silicone work mat; second anti-static silicone repair mat (blue, with parts trays)
- Large silicone mat, 27.6x16" (heat-resistant, non-stick)

### Inspection / microscopy
- Aikokkl 5" LCD digital soldering microscope with C-clamp

### ESD / PPE
- JDL ESD anti-static work gloves, carbon fiber, 6 pairs — partial ESD coverage only, does NOT
  replace an ESD wrist strap + grounding point (still a real wishlist gap)

### Electronics / phone repair
- Spudger/prying tool kit — nylon picks, metal pry bars, plastic opening tools
- Stainless magnetic parts bowls, nested set

### Electrical test equipment
- Klein Tools digital multimeter (with test leads)
- Klein Tools non-contact voltage tester (pen style)
- Second Klein pen-style tool (exact model unconfirmed — possibly a continuity tester)

### Power tools
- Dremel rotary tool (with case)
- DeWalt 20V MAX compact air compressor

### Workspace / bench infrastructure
- WALI laptop desk mount; WALI adjustable dual monitor arm
- Anker power strip w/ 2100J surge protector, 12 AC outlets, 20W USB
- UGREEN Ethernet coupler (10Gbps); UGREEN Cat 8 Ethernet cable, 6ft (40Gbps)

### General shop tools (not hacking-specific)
- Craftsman 1/4" drive socket set; Craftsman 3/8" drive socket set
- Craftsman 10-pc combination wrench set (metric "Midget" set)
- Second larger deep/standard socket tray (appears 1/2" drive)

## Wishlist (real gaps)

**Core hardware hacking:** adjustable/current-limited bench power supply (BOJACK module is
fixed voltage only), USB-to-UART adapters (1.8V/3.3V/5V logic), commercial logic analyzer
(reference/upgrade), Tigard, CH341A programmer (+1.8V adapter), Pomona 5250 SOIC8 clip,
SOIC8/16 socket adapter, Raspberry Pi 4/5, fine ESD tweezers (straight/curved — spudger kit is
not a substitute), reverse-action tweezers, PCB vise (Stickvise/Panavise Jr.), ESD wrist strap +
grounding point (gloves are not a substitute).

**Rework / desoldering:** quality flux (paste + pen), known 63/37 leaded solder (0.5-0.7mm),
desoldering braid (multiple widths), Hakko FR-301 or similar vacuum desoldering iron,
ChipQuik/low-melt alloy, Kapton tape, tip tinner, brass sponge, 99% IPA, lint-free wipes, stiff
ESD brush, hot plate (optional).

**Wiring / prototyping:** 30 AWG magnet wire, Kynar wire-wrap wire, wire-wrap tool, pogo
pins/spring pins, bidirectional level shifters (e.g. TXS0108E), 3.3V/1.8V LDO breakouts, buck
converter breakouts, USB-C breakout boards, micro/mini USB breakout boards, silicone hookup
wire (22-26 AWG), flush cutters, fine wire strippers, scalpel + blades, dental picks,
solder-mask scraper, digital calipers, heat-shrink assortment, anti-static bags/bins.

**Pin discovery / analysis:** JTAGulator (or Arduino running JTAGenum as a cheaper
alternative), oscilloscope (Rigol/Siglent class), USB-C PD/power meter, USB data isolator.

**eMMC / NAND:** eMMC-to-USB/SD adapter, eMMC pogo jig, NAND reader.

**Advanced glitching / side-channel:** ChipWhisperer-Husky or Nano, PicoEMP, crowbar/MOSFET
glitch board.

**Wireless:** RTL-SDR v4, HackRF One, Flipper Zero, Proxmark3, nRF52840 dongle, Alfa Wi-Fi
adapter.

**Hand tools (low priority, relevant once doing fine rework/teardown):** fine-tip ESD tweezers
(multiple shapes), flush/diagonal cutters, fine wire strippers (22-30 AWG), small hobby
knife/scalpel + blades, dental/hook picks, digital calipers, fine metric + imperial hex key
set, jeweler's loupe or head-mounted magnifier.

## DIY-possible (build instead of buying, where reasonable)

These stay on the wishlist even after being DIY'd — the DIY version is a learning project, not
a permanent replacement for the "real" tool.

Recommended DIY build order:
1. RP2040 logic analyzer — Project 1, in progress
2. RP2040 USB-to-UART adapter
3. RP2040 JTAG/SWD probe (via picoprobe)
4. JTAGenum / JTAG pin-discovery tool
5. DIY level shifters
6. DIY 3.3V / 1.8V regulated power supply
7. DIY pogo-pin test jig
8. DIY USB-C breakout
9. DIY crowbar/MOSFET glitcher
10. DIY USB data isolator
11. DIY eMMC reader
12. DIY NAND reader

Other technically DIY-able: DIY wire-wrap tool, DIY PCB vise, DIY custom PCB/probe fixtures,
DIY ESD grounding setup (but buy a real ESD wrist strap — don't DIY that part), DIY hot plate,
DIY USB-C PD power meter.

## Future infrastructure

Bambu Lab 3D printer — **decided 2026-10-11: A1 Combo** (full-size A1, 256mm cube, + AMS Lite
4-spool color feeder). Not purchased yet. Not tied to any single wishlist gap; a general
capability upgrade for future DIY builds. Plan is to use Claude Code + OpenSCAD or CadQuery for
parametric, code-based CAD rather than a GUI tool.

The Claude Code on the hardware-lab PC (next to the printer) will run the printer side. See
"3D printer handoff" below for the full plan.

Likely order of use once acquired (electronics):
1. Pogo-pin test jig (DIY list, step 7)
2. PCB vise (printed jaws/body, or printed inserts for a purchased vise)
3. Custom probe/fixture holders (e.g. mount for the Pomona 5250 SOIC8 clip once purchased)
4. Enclosure for the RP2040 logic analyzer (natural fit around V8)
5. Canon A570 IS teardown fixtures (later, when that project starts)

Not useful for anything needing conductivity, RF shielding, or heat resistance near the
hot-air station — plastic only.

## 3D printer handoff (from main-PC Claude, 2026-10-11)

### Why the A1 Combo
- Full A1 over the Mini: scope grew past electronics (below); 256mm gives room for pedalboard
  parts, bigger handheld shells, batch prints.
- Combo: Matt wants multi-color for art/figures. Not needed for the stamps (ink makes the color).
- Enclosed printers (P2S etc.) not needed: PETG covers pedals/handhelds/jigs; no ABS/ASA planned.
- Starter add-ons: 0.2mm nozzle (stamp/face detail), PLA (several colors), PETG, TPU (ink stamp
  faces), brass heat-set inserts (install with the soldering iron), small neodymium magnets, M3
  screws, digital calipers (already on wishlist).
- Possible later 2nd printer: a resin printer, only if Warhammer-scale minis or finer wax seals
  become a real hobby. FDM minis are passable, resin is far better. Resin needs gloves, IPA, and
  real ventilation (the solder fume extractor is not enough).

### Workflow (Claude → printer)
1. Claude writes an OpenSCAD script, key dimensions as parameters at the top (wall, hole sizes,
   fit clearance). Matt supplies real measurements (calipers, part datasheets).
2. Claude runs OpenSCAD CLI to render preview PNGs from several angles and checks them, then
   exports STL/3MF into a projects folder.
3. Matt opens it in Bambu Studio, slices, checks the preview, and presses Print himself (Wi-Fi,
   or microSD as backup). Keep the Print button Matt's: the slice preview is where floating
   parts / missing supports / wrong scale get caught.
4. Print, measure, tweak a parameter, reprint. Expect 1-3 rounds on anything press-fit.
- Use Claude for CAD, not the local LLM box (weaker at geometry, can't check renders).
- Bambu cloud vs LAN-only mode: check current firmware options at setup; Bambu has changed
  third-party access before. Bambu Studio itself works either way.
- Setup when the printer arrives: install OpenSCAD (winget), make a projects folder, do one small
  test print end to end before anything else.

### Project ideas (beyond the electronics list above)

**1. Solaire sun stamp set (first fun project).** Based on Solaire's sun insignia from Dark Souls
(yellow sun, red parts, black face). Matt wants both ink and wax.
- **Ink = layered stamp set.** The printer does NOT make the colors; ink does. Separate stamps,
  each inked and pressed onto the same spot in turn:
  - yellow layer stamp, red layer stamp, black face stamp (last).
  - Stamp light to dark: yellow, then red, then black (dark covers light; yellow over red goes muddy).
  - All share the same square base + a printed corner registration guide (paper in the corner,
    each block butts into the same corner), like a MISTI-style stamp positioner.
  - Trapping: yellow extends slightly under the red/black lines so small misalignment leaves no
    white gap.
  - Hard plastic inks unevenly: print the relief in TPU, or a thin relief glued on a foam-backed block.
- **Swappable expressions.** The black face stamp has a twist-lock (or magnet) center puck; each
  puck is one expression. Solaire's face is simple lines, so expressions can be parametric in
  OpenSCAD (eye shape, brow angle, mouth curve). Hand-drawn SVGs can be imported too. Puck seam
  sits on the face's circle outline so it hides in the impression.
- **Wax = single stamp** (rays + face in one press, still with swappable face pucks), PLA/PETG,
  chill between presses. Typical seal size ~25-30mm; 0.2mm nozzle; keep face lines bold.
- ALWAYS mirror the stamping relief or impressions come out backwards.
- Still open with Matt: size, handle style (stick handle vs palm-sized block), starter list of
  3-5 expressions. Fan-art note: fine for personal use; selling = fan-art gray area.

**2. Guitar pedals.** Most builders use aluminum Hammond boxes (1590B/125B) for shielding and
stomp strength. Printer is best for drill templates, knobs, footswitch toppers, back plates,
pedalboard brackets. Printed enclosures are possible: PETG, thick walls, solid infill around the
footswitch, copper tape shielding (grounded), heat-set inserts. Open: kits vs own circuits.

**3. Handheld gaming case.** Two-piece clamshell printed flat, tight button tolerances,
multi-color buttons via AMS Lite. RP2040 + small screen is a natural tie-in with the hardware
track. Open: RP2040 homebrew vs Raspberry Pi emulation vs reshelling an existing handheld.

**4. Art / figures.** Multi-color display pieces, keychains, signs, busts via the Combo.
Warhammer-scale minis: OK for gaming/paint practice, resin for real quality.

## Open items

- Exact computer specs being used for development
- List of "sacrificial" hardware — devices safe to break/practice on, distinct from the
  Canon A570 IS (the intended future real target, not a sacrificial device)
