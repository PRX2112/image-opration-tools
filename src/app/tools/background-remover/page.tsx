import BackgroundRemoverTool from '@/components/tools/BackgroundRemoverTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Remove Image Background Online – AI-Powered Tool',
    description: 'Remove backgrounds from images online for free using AI. No uploads required — runs directly in your browser. Coming soon.',
    alternates: { canonical: '/tools/background-remover' }
};

export default function BackgroundRemoverPage() {
    return <BackgroundRemoverTool />;
}
