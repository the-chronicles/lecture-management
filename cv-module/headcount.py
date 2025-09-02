import cv2
import requests
import paho.mqtt.client as mqtt
import os
import time


from dotenv import load_dotenv
load_dotenv()

# ENV VARIABLES (you can also use dotenv)
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000/headcount")
MQTT_BROKER = os.getenv("MQTT_BROKER", "broker.hivemq.com")
MQTT_TOPIC = "lecture/hall/headcount"
HALL_NAME = os.getenv("DEVICE_HALL", "LT1")

# Load Haar Cascade
cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(cascade_path)

# MQTT Setup
mqtt_client = mqtt.Client()
mqtt_client.connect(MQTT_BROKER, 1883, 60)

# Webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("❌ Cannot access webcam")
    exit()

print("🎥 Tracking started — press 'q' to stop")

def send_headcount(count):
    payload = {
        "hall": HALL_NAME,
        "count": count,
        "capturedBy": "cv-device",
    }

    try:
        # REST
        res = requests.post(BACKEND_URL, json=payload)
        print(f"📡 Sent via REST — Count: {count} — Status: {res.status_code}")
    except Exception as e:
        print(f"❌ REST Error: {e}")

    try:
        # MQTT
        mqtt_client.publish(MQTT_TOPIC, str(count))
        print(f"📡 Sent via MQTT — Count: {count}")
    except Exception as e:
        print(f"❌ MQTT Error: {e}")

# Loop
prev_count = -1  # to track changes
last_sent_time = time.time()
final_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Failed to read frame")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
    count = len(faces)

    # Visualize
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.putText(frame, f"Count: {count}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)
    cv2.imshow("Headcount Tracker", frame)

    # Send only when count changes and 3s have passed since last send
    if count != prev_count and time.time() - last_sent_time > 3:
        send_headcount(count)
        prev_count = count
        final_count = count  # update final
        last_sent_time = time.time()

    # Exit on 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print(f"👋 Session ended. Sending final count: {final_count}")
        send_headcount(final_count)
        break

cap.release()
cv2.destroyAllWindows()
