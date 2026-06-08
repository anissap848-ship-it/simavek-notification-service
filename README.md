# Notification Service

Bagian dari **Sistem Manajemen Inventaris Apotek** berbasis microservices.

Service ini menerima event dari RabbitMQ dan menyimpan notifikasi ke Firebase Firestore.

## Tech Stack
- Node.js + Express.js
- RabbitMQ (amqplib)
- Firebase Firestore
- Docker

## Queues
| Queue | Deskripsi |
|---|---|
| `notification.low_stock` | Stok obat menipis |
| `notification.transaction` | Transaksi masuk/keluar |
| `notification.expiry_alert` | Obat mendekati expired |

## Cara Menjalankan
```bash
cp .env.example .env
docker-compose up --build
```

## Endpoints
| Method | Path | Deskripsi |
|---|---|---|
| GET | `/health` | Health check |
