const { createServer } = require('http')
const { parse } = require('url')
const { join } = require('path')
const next = require('next')
const accessLog = require('access-log')

const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
    createServer((req, res) => {
        accessLog(req, res, {
            userID: function (req) { return req.user; },
            format: 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"'
        })

        const parsedUrl = parse(req.url, true)
        const { pathname } = parsedUrl

        if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
            const filePath = join(__dirname, 'public', pathname)
            app.serveStatic(req, res, filePath)
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port, "127.0.0.1", (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})