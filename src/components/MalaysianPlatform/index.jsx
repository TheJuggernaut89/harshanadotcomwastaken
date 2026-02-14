import React from 'react';
import MalaysianPlatformHero from './MalaysianPlatformHero';
import ThreeLayerSystem from './ThreeLayerSystem';
import KopitiamIntelPipeline from './KopitiamIntelPipeline';
import MamakWorkshopPipeline from './MamakWorkshopPipeline';
import MakcikApprovalPipeline from './MakcikApprovalPipeline';
import { ParallaxSection } from '../UI/ParallaxSection';
import { DualLogoCloud } from '../UI/DualLogoCloud';
import { toolLogos } from '../../data/toolLogos';

// Import subsections (Phase 4+)
// import MalaysianDifference from './MalaysianDifference';
// import SystemArchitecture from './SystemArchitecture';
// import ImpactMetrics from './ImpactMetrics';
// import CaseStudyShowcase from './CaseStudyShowcase';
// import BuildProcess from './BuildProcess';
// import PlatformCTA from './PlatformCTA';

const MalaysianPlatform = () => {
    const handleDemoClick = (tool) => {
        console.log('Demo clicked for:', tool.name);
        // Scroll to featured demos section
        document.getElementById('featured-demos')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="malaysian-platform"
            className="relative overflow-hidden"
        >
            {/* Subtle batik pattern background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-navy dark:bg-navy-dark"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231D3557' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Content container */}
            <div className="relative z-10">
                {/* Phase 2: Core Components */}
                <MalaysianPlatformHero />

                <ParallaxSection effect="translate" offset={30}>
                    <ThreeLayerSystem />
                </ParallaxSection>

                {/* Layer Demos - Tools Working Together */}
                <ParallaxSection effect="fade" offset={20}>
                    <KopitiamIntelPipeline />
                </ParallaxSection>

                <ParallaxSection effect="fade" offset={20}>
                    <MamakWorkshopPipeline />
                </ParallaxSection>

                <ParallaxSection effect="fade" offset={20}>
                    <MakcikApprovalPipeline />
                </ParallaxSection>

                <ParallaxSection effect="fade" offset={25}>
                    <div className="py-12">

                        <DualLogoCloud logos={toolLogos} />
                    </div>
                </ParallaxSection>

                {/* Phase 4+: Additional Components (Coming Next) */}
                {/* <MalaysianDifference /> */}
                {/* <SystemArchitecture /> */}
                {/* <ImpactMetrics /> */}
                {/* <CaseStudyShowcase /> */}
                {/* <BuildProcess /> */}
                {/* <PlatformCTA /> */}
            </div>
        </section>
    );
};

export default MalaysianPlatform;
