
# Deepcase Backend Developer Case


## API Kullanımı

#### Giriş Yap

```http
  POST /api/user/login
```

| Veri | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | Kullanıcı adı |
| `password`      | `string` | Şifre |

#### Kayıt Ol

```http
  POST /api/user/register
```

| Veri | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | İsim |
| `username`      | `string` | Kullanıcı adı |
| `password`      | `string` | Şifre |

---
#### Tüm ürünleri getir

```http
  GET /api/product
```

| Authorization | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `Token` | Login olduktan sonra verilen token |

#### Ürün Ekle

```http
  POST /api/product
```

| Authorization | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `Token` | Login olduktan sonra verilen token |

| Veri | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | Ürün adı |
| `price`      | `integer` | Ürün fiyatı |



#### Ürün Güncelle

```http
  PUT /api/product/:id
```

| Authorization | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `Token` | Login olduktan sonra verilen token |

| Veri | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Ürün ID (parametre olarak gönderilir) |
| `price`      | `integer` | Ürün fiyatı |
| `status`      | `string` | "active" veya "passive" değerlerini alır. |


#### Ürün Sil

```http
  DELETE /api/product/:id
```

| Authorization | Tip     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `Bearer Token` | `Token` | Login olduktan sonra verilen token |

| Veri | Tip     | Açıklama                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | Ürün ID (parametre olarak gönderilir) |

  
## Kullanılan Teknolojiler

**Sunucu:** Node, Express, PostgreSQL

**Docker** ile deploy edildi.

  
## Deploy

Bu projeyi çalıştırmak için **Docker**'a sahip olmalısınız.

```bash
  npm run deploy
```

  