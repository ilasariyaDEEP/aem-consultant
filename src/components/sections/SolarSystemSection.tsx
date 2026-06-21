import dynamic from 'next/dynamic';

const ExternalSolarSystem = dynamic(() => import('../canvas/ExternalSolarSystem'), {
  ssr: false,
});
export default function SolarSystemSection() {
    return (
        <section
            id="home"
            className="min-h-[90vh] flex flex-col justify-center px-gutter max-w-container-max mx-auto relative pt-20 overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <ExternalSolarSystem />
            </div>
        </section>
    )
}