# Как работать с проектом

Для каждой задачи создавайте отдельную ветку от актуальной `main`.

Пример:

```bash
git switch main
git pull
git switch -c fix/CP-101-short-description
```

Перед созданием pull request запустите:

```bash
npm run check
npm run build
```

В pull request кратко опишите:

- что изменилось;
- как проверялось поведение;
- какой Issue закрывает PR.

Не объединяйте в одном PR несвязанные изменения и по возможности добавляйте regression-тест для исправленного поведения.
