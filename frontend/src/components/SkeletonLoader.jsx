import React from 'react';

const SkeletonBase = ({ className, style }) => (
    <div 
        className={`skeleton-base ${className || ''}`}
        style={{
            background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-loading 1.5s infinite linear',
            borderRadius: '8px',
            ...style
        }}
    />
);

export const PageSkeleton = () => (
    <div style={{ padding: '20px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <SkeletonBase style={{ width: '60px', height: '60px', borderRadius: '16px', margin: '40px auto 20px' }} />
        <SkeletonBase style={{ width: '200px', height: '32px', margin: '0 auto 10px' }} />
        <SkeletonBase style={{ width: '150px', height: '20px', margin: '0 auto 40px' }} />
        
        <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
            <SkeletonBase style={{ width: '40%', height: '14px', marginBottom: '10px' }} />
            <SkeletonBase style={{ width: '100%', height: '50px', marginBottom: '20px', borderRadius: '12px' }} />
            
            <SkeletonBase style={{ width: '40%', height: '14px', marginBottom: '10px' }} />
            <SkeletonBase style={{ width: '100%', height: '50px', marginBottom: '20px', borderRadius: '12px' }} />
            
            <SkeletonBase style={{ width: '100%', height: '54px', marginTop: '10px', borderRadius: '16px' }} />
        </div>
        
        <style>{`
            @keyframes skeleton-loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `}</style>
    </div>
);

export const HomeSkeleton = () => (
    <div style={{ padding: '20px', background: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <SkeletonBase style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            <SkeletonBase style={{ width: '100px', height: '40px', borderRadius: '20px' }} />
        </div>
        
        <SkeletonBase style={{ width: '100%', height: '180px', borderRadius: '28px', marginBottom: '24px' }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <SkeletonBase style={{ width: '50px', height: '50px', borderRadius: '16px', marginBottom: '8px' }} />
                    <SkeletonBase style={{ width: '40px', height: '10px' }} />
                </div>
            ))}
        </div>
        
        <SkeletonBase style={{ width: '150px', height: '24px', marginBottom: '15px' }} />
        <SkeletonBase style={{ width: '100%', height: '250px', borderRadius: '24px' }} />
    </div>
);
