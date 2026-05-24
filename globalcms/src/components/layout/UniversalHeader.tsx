import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useTenant } from '../../context/TenantContext';
import { Globe, Accessibility, ShieldCheck } from 'lucide-react';

export const UniversalHeader: React.FC = () => {
    const { tenant } = useTenant();

    const start = (
        <div className="flex align-items-center gap-2 mr-4">
            <div className="bg-primary-reverse border-circle flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <ShieldCheck size={24} className="text-primary" />
            </div>
            <div className="flex flex-column">
                <span className="font-bold text-xl text-primary line-height-1">Global CMS</span>
                <span className="text-sm text-600 uppercase tracking-wider">{tenant?.name || 'Department'}</span>
            </div>
        </div>
    );

    const end = (
        <div className="flex align-items-center gap-2">
            <Button 
                label="Bhashini" 
                icon={<Globe size={18} className="mr-2" />} 
                className="p-button-text p-button-secondary font-medium" 
                tooltip="Toggle Language"
                tooltipOptions={{ position: 'bottom' }}
            />
            <Button 
                label="Accessibility" 
                icon={<Accessibility size={18} className="mr-2" />} 
                className="p-button-text p-button-secondary font-medium" 
                tooltip="High Contrast Mode"
                tooltipOptions={{ position: 'bottom' }}
            />
            <Button 
                icon="pi pi-user" 
                rounded 
                className="p-button-text p-button-secondary" 
            />
        </div>
    );

    return (
        <div className="card sticky top-0 z-5 shadow-2">
            <Menubar start={start} end={end} className="border-none border-noround px-4 py-2" />
        </div>
    );
};
