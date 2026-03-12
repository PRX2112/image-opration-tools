import WatermarkTool from '@/components/tools/WatermarkTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Add Watermark to Image Online – Free Tool',
    description: 'Add text or image watermarks to your photos online for free. Control position, opacity, size, and color. Download instantly.',
    alternates: { canonical: '/tools/watermark' }
};

export default function WatermarkPage() {
    return <WatermarkTool />;
}
