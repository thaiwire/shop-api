import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('hello')
export class HelloController {
    // Get /hello
    @Get()
    sayHello() {
        return { message: 'สวัสดี nextjs' };
    }
    

    // Get /hello/greet
    @Get(':name')
     sayHelloTo(@Param('name') name: string) {
         return `Hello, ${name}!`;
     }

     // Get /hello/search/age?age=20
     @Get('search/age')
     checkAge(@Query('age') age: string) {
        const n = Number(age);
         return { age: n ,isAdult: n >= 18 };
     }
     
}
