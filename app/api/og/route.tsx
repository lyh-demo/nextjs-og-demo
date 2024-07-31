import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = 'edge';

export const GET = async (req: NextRequest) => {
    try {
        const imageData = await fetch(new URL('./images/avatar.png', import.meta.url).toString()).then(
            (res) => res.arrayBuffer()
        );
        const fontData = await fetch(new URL('./fonts/LXGWWenKai-Regular.ttf', import.meta.url).toString(), { cache: 'no-store' }).then(
            (res) => res.arrayBuffer()
        );
        const bgAccent = '#95cb9d';
        const bgAccentLight = '#d9ecdc';
        const bgAccentUltraLight = '#eef7ef';
        const seo = {
            title: 'Liu Yuhe',
            description: `I'm a fullstack developer`,
        };
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        background: `linear-gradient(37deg, ${bgAccent} 27.82%, ${bgAccentLight} 79.68%, ${bgAccentUltraLight} 100%)`,
                        fontFamily: 'LXGW WenKai Screen R',
                        padding: '5rem 15rem',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <img 
                        // @ts-ignore
                        src={imageData} 
                        style={{
                            borderRadius: '50%'
                        }} 
                        height={256} 
                        width={256} 
                    />
    
                    <p style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{
                            color: '#ffffff99',
                            fontSize: '3.5rem',
                        }}>
                            {seo.title}
                        </h3>
                        <p style={{
                            fontSize: '1.8rem',
                            color: '#ffffff89',
                        }}>
                            {seo.description}
                        </p>
                    </p>
                </div>
            ),
            {
                width: 1200,
                height: 600,
                fonts: [
                    {
                        name: 'LXGW WenKai Screen R',
                        data: fontData,
                        weight: 400,
                        style: 'normal'
                    }
                ],
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate the OG image. Error ${e.message}`, {
            status: 500,
        })
    }
}