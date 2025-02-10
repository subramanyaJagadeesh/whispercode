import openai
import os
import pyaudio
import wave

# Set OpenAI API Key
openai.api_key = ""

# Audio settings
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
CHUNK = 1024
RECORD_SECONDS = 10
WAVE_OUTPUT_FILENAME = "speech.wav"

# Start recording
audio = pyaudio.PyAudio()
stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)
frames = []

# print("Listening... Speak your code!")
for _ in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

stream.stop_stream()
stream.close()
audio.terminate()

# Save the recording
with wave.open(WAVE_OUTPUT_FILENAME, "wb") as wf:
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(audio.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))

# print(f"Saved recording: {WAVE_OUTPUT_FILENAME}")

# Send audio to Whisper API for transcription
with open(WAVE_OUTPUT_FILENAME, "rb") as audio:
    response = openai.Audio.transcribe(
        model="whisper-1",
        file=audio
    )

spoken_code = response["text"]
# print(f"Transcribed Speech:\n{spoken_code}")

# Send transcribed speech to GPT-4 for structured code generation
gpt_response = openai.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are an AI that converts spoken programming code into properly formatted code."},
        {"role": "user", "content": f"Convert this spoken programming statement into properly formatted code:\n{spoken_code}; Just give me the code and nothing else"}
    ]
)

generated_code = gpt_response["choices"][0]["message"]["content"]
# print(f"Generated Code:\n{generated_code}")

# Output the final generated code
# print("## GENERATED CODE ##")
print(generated_code)
