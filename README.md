# Museum Digital

Интерактивный сайт-агрегатор музеев мира.

## Публичная ссылка на сайт

**https://smolnikov6733-sketch.github.io/museum/**

> Сайт появится через 1–5 минут после успешного деплоя. Статус: вкладка [Actions](https://github.com/smolnikov6733-sketch/museum/actions) — зелёная галочка.

## Если сайт не открывается (404)

Сделайте **один** раз вручную:

1. Откройте: https://github.com/smolnikov6733-sketch/museum/settings/pages  
2. **Build and deployment** → **Source** → выберите **GitHub Actions**  
3. Сохраните (если есть кнопка Save)  
4. Откройте: https://github.com/smolnikov6733-sketch/museum/actions  
5. Слева выберите **Deploy site to GitHub Pages** → **Run workflow** → **Run workflow**

Альтернатива (проще): в **Source** выберите **Deploy from a branch** → ветка **gh-pages** → папка **/ (root)** → Save.

## Локальный просмотр

```bash
cd museum_project
python3 -m http.server 8080
```

Откройте http://localhost:8080
