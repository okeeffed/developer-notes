---
menu: Ableton
name: Nature Of Sound (Sound Production Course)
---

# Nature Of Sound

Sound has a medium that carries the distrubances from one place to another. It is our brains that percieve the sound.

## Resources

1. [Course Link](https://www.kadenze.com/courses/sound-production-in-ableton-live-for-musicians-and-artists-v/sessions/introduction-to-ableton-live)

## Frequency

> How often our particles in the medium vibrate back and forward (cycles) per second.

1 Hertz = 1 cycle/second. This means that 440 hertz = 440 cycle/second.

## Pitch

An auditory sensation of frequency where the user assigns a tone. A high pitch sound corresponds with a high frequency, low to low.

While Pitch and Frequency are related, they are objectively different.

> An example given is that tuning a guitar is better to use pitch as we are not tuning to a specific frequency.

When you raised your pitch by twelve semitones, you actually double your frequency.

When a note played at 440Hz is raised an octave it 880Hz, but raised another octave is 1760Hz.

## Loudness

Measure is decibels in relation to sound pressure.

## Digital Audio: Sample Rate

What happens when we represent sound in a computer?

**Sampling** is capturing the amplitude of a wave form over time. The amount of samples we take per second is the **sample rate**.

> The example given is using film for the FPS as "samples". It is similar to audio, except we vertically slice the audio signal over time - which we need to do A LOT.

There is a theorem that the sample rate needs to be double the highest rate of the frequency we want to reproduce. We need this to be at least twice the frequency to get the positive and negative part of the wave form cycle.

**Aliasing** refers to the distortion or artifacts that result when the signal reconstructed from samples is different from the original continuous signal.

There are other artefacts and issues that can occur around the highest frequency we try to sample, so we general have anti-aliasing to filter out these frequencies. Generally that means our sample rate is generally higher than what we need from the theorem (that is how the 44k Hz number came about). There is also history there with compatibility with film.

## Bit Depth

The amplitude of each sample is encoded as a number. The resolution of that number is called the **bit depth**. It describes how well we can capture the wave forms variations and amplitude. It describes the dynamic range of the system. You can consider it the resolution on the y-axis of the wave form.

High-depth = greater resolution. Eg 24-bit has a higher resolution than 16-bit.

Most people prefer to mix at 24-bit to have better resolution at higher loudness.

> Most people mix at higher sample rates and bit depth than the 44k Hz and 24-bit and then bring the output back down.

## Gain Staging

**Gain staging** is the act of making sure that the levels are appropraite at each stage of the signal path. This includes a healthy signal path from the output of the instrument (through mics, preamps etc), the effects processing and the final stereo mix bus on the DAW.

The aim is to ensure a healthy signal-to-noise ratio with enough headroom so you don't introduce unwanted artefacts into the audio. We can think of it as a healthy or safety zone allowing transient audio peaks without degrading the audio quality and introducing distorion or digital clipping etc.

DBFS is used in digital systems which is decibels relative to the maximum amplitude to what the system can produce or represent. 0 DBFS is the max a digital system can represent. That is why our audio systems in live will always show negative numbers. As soon as it is positive, we are degrading out signal.

> You will hear a hash digital clipping if the signal gets too hot.

In the analog world, there is generally more headroom over the analog 0. Most analog professional gear has about 20 decibels. Any clipping that does happen is generally a welcome, natural sound.

In Ableton, tradition headroom is about 24dB (actual analog headroom need is 30dB) with 6dB minimum cushion.

Zero in the analog system is -24dB in the digital system. There is no need for the DAW to peak anywhere near the 0 DBFS.

> As a general rule of them, mix starting at -12 to -18dB so they can adjust later or use the gain up later safely. Doing so will guarantee you won't run into problems.

Distortion and clipping take up a lot of crucial space in your mix.

## Mixing Practice

Ear fatigue is real and after hours the high frequencies will begin to roll off.

- Mixes will tend to be bright as you compensate.
- Mix at lower volumes.
- Take breaks

It is important to know your room and/or headphones.

Notes for headphoes:

- Altered perception of stereo-field
- Feel wider than stero speakers
- Plugins like **Redline Monitor** emulate your speakers
