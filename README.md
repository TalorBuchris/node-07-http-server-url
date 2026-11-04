# תרגיל 7 – שרת Node.js בסיסי ומודול URL 🌐

תשעה תרגילים קצרים ב-Node.js, ללא Express.

| חלק | תרגילים | נושא |
|---|---|---|
| A – שרת בסיסי | 1–3 | שרת `http` שמחזיר טקסט, שיטת בקשה וכותרות בקשה |
| B – מודול URL | 4–6 | ניתוח כתובת URL, קריאת פרמטרים ושינוי שלהם |
| C – שרת Vanilla | 7–9 | הצגת פרטי בקשות בטרמינל, תגובה לפי שיטה וכותרת, וניתוב ידני |

## תחילת העבודה

1. לחצו על **Use this template** ← **Create a new repository** בראש העמוד כדי ליצור מאגר משלכם.
2. בצעו `git clone` למאגר החדש שלכם ופתחו אותו ב-VS Code.
3. בטרמינל, הריצו פעם אחת: `npm install` (נדרשת גרסה 20 ומעלה של Node – בדקו באמצעות `node -v`).
4. כתבו את הקוד שלכם בקבצים `ex1.js` עד `ex9.js`. כל קובץ הוא תוכנית נפרדת, והמשימה מופיעה בראש כל קובץ.

### איך מריצים תרגיל?

```bash
node ex1.js
```

- **תרגילי שרת (1–3, 7–9):** השרת מאזין בפורט `3000`. פתחו בדפדפן את הכתובת `http://localhost:3000`. שלחו בקשות `POST` / `PUT` / `DELETE` ובקשות עם כותרות מותאמות אישית באמצעות Postman או Thunder Client. עצרו את השרת באמצעות `Ctrl + C` לפני הפעלת תרגיל אחר.
- **תרגילי URL (4–6):** התוכנית מדפיסה פלט בטרמינל ומסתיימת.

## איך לבדוק את העבודה שלכם?

```bash
npm test
```

- בהתחלה כל הבדיקות מסומנות באדום (✘). שם כל בדיקה מתחיל במספר התרגיל שאותו היא בודקת.
- הבדיקות מריצות כל קובץ בדיוק כמו `node exN.js`, שולחות בקשות אמיתיות לשרת ובודקות מה הוא החזיר **וגם מה הוא הדפיס בטרמינל** (`console.log`).
- אין צורך להפעיל את השרת בעצמכם לפני הרצת `npm test`. הבדיקות מפעילות אותו בעצמן (בפורט פנוי, גם אם פורט 3000 תפוס).
- מתחת לכל בדיקה שנכשלה תוכלו לראות מה השתבש, ולעיתים גם מה התוכנית שלכם הדפיסה בפועל.
- בתרגילי URL, הבדיקות מריצות את הקוד גם עם כתובת URL **שונה** מזו שמופיעה בתרגיל, כדי לוודא שהפלט באמת נוצר מתוך כתובת ה-URL ולא הוגדר מראש בקוד. לכן, השאירו בקוד את כתובת ה-URL שמופיעה בתרגיל בדיוק כפי שניתנה.
- כאשר כל הבדיקות מסומנות בירוק (✔), תופיע ההודעה **✅ המשימה אושרה (APPROVED)** ותוכלו לעבור למשימה הבאה.
- לאחר הרצת `git push`, הבדיקות רצות גם ב-GitHub (בלשונית Actions). סימון ירוק לצד ה-commit פירושו שהמשימה אושרה.
- כדי לבדוק תרגיל בודד: `node --test test/ex4.test.js`

> אין לשנות את הקבצים שבתיקיית `test/`.

---

## חלק A – שרת בסיסי

בכל תרגיל יוצרים שרת באמצעות `http.createServer(...)` ומפעילים אותו באמצעות `server.listen(3000)`.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("some text");
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

### תרגיל 1: החזרת טקסט קבוע – `ex1.js`

**מטרה:** ליצור שרת שתמיד מחזיר את התשובה:

`"Hello from Node Server!"`

ללא קשר לבקשה שהתקבלה.

### תרגיל 2: החזרת שיטת הבקשה – `ex2.js`

**מטרה:** השרת צריך להחזיר את השיטה שבה נעשה שימוש בבקשה.

דוגמה: אם שיטת הבקשה היא GET, יש להחזיר:

`"You used method: GET"`

### תרגיל 3: החזרת כותרות הבקשה – `ex3.js`

**מטרה:** להחזיר ללקוח את כל כותרות הבקשה (Request Headers) כמחרוזת JSON.

---

## חלק B – מודול URL

### איך משתמשים במודול?

```js
const { URL } = require("url");   // או: import { URL } from "url";

const myUrl = new URL('http://localhost:3000/search?term=nodejs&limit=10');
console.log(myUrl.pathname);                 // "/search"
console.log(myUrl.searchParams.get('term'));  // "nodejs"
```

> הפרויקט הזה משתמש ב-`require` (שיטת CommonJS), כמו בתרגילים הקודמים.

### תרגיל 4: ניתוח חלקי כתובת URL והדפסתם – `ex4.js`

**משימה:** ליצור סקריפט שמקבל מחרוזת של כתובת URL ומדפיס את החלקים הבאים:

- שם המארח (Hostname)
- נתיב (Pathname)
- פרוטוקול (Protocol)
- מחרוזת השאילתה (Query String)
- מקטע (Fragment / Hash)

**כתובת URL לדוגמה שבה יש להשתמש:**

```js
const urlStr = 'http://localhost:3000/users/list?role=admin&active=true#top';
```

**הפלט המצופה:**

```text
Hostname: localhost
Pathname: /users/list
Protocol: http:
Query: ?role=admin&active=true
Hash: #top
```

### תרגיל 5: חילוץ פרמטרים מתוך כתובת URL – `ex5.js`

**משימה:** בהינתן כתובת URL, יש לחלץ ערכים של פרמטרים מסוימים באמצעות `.searchParams.get()`:

- השתמשו בכתובת:
  `https://site.com/products?id=15&type=book&lang=en`
- חלצו את הערכים של `id`, `type` ו-`lang`.
- הדפיסו אותם.

**הפלט המצופה:**

```text
ID: 15
Type: book
Language: en
```

### תרגיל 6: שינוי פרמטרים בכתובת URL – `ex6.js`

**משימה:** התחילו מכתובת ה-URL הבאה:

```js
const urlStr = 'https://app.com/search?query=node&sort=asc';
```

- שנו את הפרמטר `sort` לערך `'desc'`.
- הוסיפו פרמטר חדש בשם `page` עם הערך `3`.
- הסירו את הפרמטר `query`.
- הדפיסו את כתובת ה-URL הסופית.

**הפלט המצופה:**

```text
https://app.com/search?sort=desc&page=3
```

**רמז:** השתמשו במתודות:

- `.searchParams.set()`
- `.searchParams.append()`
- `.searchParams.delete()`

כדי להדפיס את כתובת ה-URL כמחרוזת טקסט, השתמשו ב-`myUrl.href` או ב-`myUrl.toString()`.

---

## חלק C – שרת Vanilla

### תרגיל 7: הצגת שיטת הבקשה, כתובת ה-URL וגרסת HTTP – `ex7.js`

**משימה:** ליצור שרת בפורט 3000. עבור כל בקשה שמתקבלת, יש:

- להדפיס את שיטת הבקשה (לדוגמה GET, POST).
- להדפיס את כתובת הבקשה (לדוגמה `/login?x=1`).
- להדפיס את גרסת HTTP שבה נעשה שימוש (לדוגמה 1.1 או 2.0).

**יש להשתמש במאפיינים:**

- `req.method`
- `req.url`
- `req.httpVersion`

**דוגמה לפלט המצופה** (בטרמינל שבו השרת פועל, לאחר פתיחת הכתובת `http://localhost:3000/login?x=1`):

```text
Method: GET
URL: /login?x=1
HTTP Version: 1.1
```

הערה: בנוסף להדפסת הפרטים, השרת חייב גם **להחזיר תשובה** לבקשה (`res.end(...)`), אחרת הדפדפן ימשיך להמתין. גם הבדיקות בודקות זאת.

> לפעמים הדפדפן שולח בקשה נוספת ל-`/favicon.ico`, ולכן ייתכן שתראו שתי הודעות בטרמינל. זה תקין.

### תרגיל 8: תגובה בהתאם לכותרות ולשיטת הבקשה – `ex8.js`

**משימה:** ליצור שרת שבודק:

- האם שיטת הבקשה היא POST.
- האם הכותרת Content-Type היא `application/json`.

אם שני התנאים מתקיימים, יש להחזיר:

`"JSON accepted"`

אחרת, יש להחזיר:

`"Unsupported request"`

**רמז:**

```js
req.method === 'POST'
req.headers['content-type'] === 'application/json'
```

### תרגיל 9: טיפול ידני בניתוב ובדיקת שיטת הבקשה – `ex9.js`

**משימה:** ליצור שרת פשוט ש:

- מקבל בקשת GET לכתובת `/hello` ← מחזיר: `"Hello from GET"`.
- מקבל בקשת POST לכתובת `/hello` ← מחזיר: `"Hello from POST"`.
- כל בקשה אחרת ← מחזירה: `"Not supported"`.

**יש להשתמש רק ב:**

- `req.url`
- `req.method`

---

## בדיקה עצמית (Self-check)

- [ ] `node ex1.js` ← הדפדפן מציג `Hello from Node Server!` בכל נתיב.
- [ ] `node ex2.js` ← ב-Postman, בקשת POST מחזירה `You used method: POST`.
- [ ] `node ex3.js` ← מוצג JSON עם כותרות הבקשה שהדפדפן שלח (`host`, `user-agent` ועוד).
- [ ] `node ex4.js`, `node ex5.js`, `node ex6.js` ← הפלט תואם לפלט המצופה.
- [ ] `node ex7.js` ← כל רענון של הדפדפן מדפיס בטרמינל את Method, URL ו-HTTP Version.
- [ ] `node ex8.js` ← בקשת POST עם `Content-Type: application/json` מחזירה `JSON accepted`, וכל בקשה אחרת מחזירה `Unsupported request`.
- [ ] `node ex9.js` ← הכתובת `/hello` מחזירה תשובה מתאימה לבקשות GET ו-POST, וכל בקשה אחרת מחזירה `Not supported`.
- [ ] `npm test` ← **✅ המשימה אושרה (APPROVED)**.
