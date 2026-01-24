import { useEffect, useState } from 'react';

export function useWebGL() {
    const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkWebGL = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                return !!(window.WebGLRenderingContext && gl);
            } catch (e) {
                return false;
            }
        };

        setWebGLAvailable(checkWebGL());
    }, []);

    return webGLAvailable;
}
