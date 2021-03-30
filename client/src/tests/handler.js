import { rest } from "msw";

export const handlers = [
    rest.get('/api/initv', (req,res,ctx)=>{
        return res(ctx.json([
            { ncsrfToken: 'bla bla'}
        ]))
    }),
    rest.get('/api/auth/refresh', (req,res, ctx)=>{
        return res(ctx.json([]))
    }),
    rest.post('http://localhost:3030/order', (req,res,ctx)=>{
     return res(ctx.json({ orderNumber: '123213123'}))
    }),
    rest.post('/api/auth/logout', (req,res,ctx)=>{
        return res(ctx.json([]))
    })
];