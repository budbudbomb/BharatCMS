const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'ClientDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add moveSection function
const moveSectionCode = `
    const moveSection = (idx: number, dir: 1 | -1) => {
        setDynamicData((prev: any) => {
            const currentOrder = prev.layout?.sectionOrder || ['accessibility', 'branding', 'navbar', 'ticker', 'hero', 'services', 'about', 'schemes', 'impact', 'noticeHelpdesk', 'footer'];
            if ((dir === -1 && idx === 0) || (dir === 1 && idx === currentOrder.length - 1)) return prev;
            
            const newOrder = [...currentOrder];
            const temp = newOrder[idx];
            newOrder[idx] = newOrder[idx + dir];
            newOrder[idx + dir] = temp;
            
            return { ...prev, layout: { ...prev.layout, sectionOrder: newOrder } };
        });
    };
`;
content = content.replace('const updateField =', moveSectionCode + '\n    const updateField =');

// 2. Add renderOrderControls helper
const helperCode = `
    const renderOrderControls = (idx: number, total: number) => (
        <div className="flex align-items-center gap-1 mr-2" onClick={e => e.stopPropagation()}>
            <button 
                disabled={idx === 0} 
                onClick={(e) => { e.stopPropagation(); moveSection(idx, -1); }} 
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', borderRadius: '4px', cursor: idx === 0 ? 'not-allowed' : 'pointer', padding: '2px 6px', fontSize: '10px' }}
            >▲</button>
            <button 
                disabled={idx === total - 1} 
                onClick={(e) => { e.stopPropagation(); moveSection(idx, 1); }} 
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: idx === total - 1 ? 'rgba(255,255,255,0.2)' : '#fff', borderRadius: '4px', cursor: idx === total - 1 ? 'not-allowed' : 'pointer', padding: '2px 6px', fontSize: '10px' }}
            >▼</button>
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }}></div>
        </div>
    );
`;
content = content.replace('const updateField =', helperCode + '\n    const updateField =');

// 3. Remove hardcoded numbers from tab titles (e.g., "1. GIGW" -> "GIGW")
content = content.replace(/<span className="tab-title">\d+\.\s/g, '<span className="tab-title">');

// 4. Transform the 11 tabs into EditorTabs object
// First, insert the IIFE start
const startIdx = content.indexOf('{/* 1. GIGW ACCESSIBILITY */}');
const endIdx = content.indexOf('</div>\n                    </div>\n                </aside>');

let renderBlock = content.substring(startIdx, endIdx);

// Replace boundaries
renderBlock = renderBlock.replace('{/* 1. GIGW ACCESSIBILITY */}', `
                            {(() => {
                                const defaultOrder = ['accessibility', 'branding', 'navbar', 'ticker', 'hero', 'services', 'about', 'schemes', 'impact', 'noticeHelpdesk', 'footer'];
                                const sectionOrder = dynamicData.layout?.sectionOrder || defaultOrder;
                                
                                const EditorTabs: Record<string, (idx: number, total: number) => React.ReactNode> = {
                                    accessibility: (idx, total) => (
`);
renderBlock = renderBlock.replace('{/* 2. BRANDING HEADER */}', `), branding: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 3. MAIN NAVIGATION */}', `), navbar: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 4. NEWS TICKER MARQUEE */}', `), ticker: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 5. HERO SECTION CAROUSEL */}', `), hero: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 6. QUICK SERVICE CARDS */}', `), services: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 7. ABOUT SECTION SPLIT */}', `), about: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 8. SCHEMES DIRECTORY */}', `), schemes: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 9. IMPACT DASHBOARD MAP */}', `), impact: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 10. NOTICE BOARD & HELPDESK */}', `), noticeHelpdesk: (idx, total) => (`);
renderBlock = renderBlock.replace('{/* 11. GOVT FOOTER */}', `), footer: (idx, total) => (`);

// End IIFE
renderBlock += `
                                };

                                return (
                                    <>
                                        {sectionOrder.map((key: string, idx: number) => (
                                            <React.Fragment key={key}>
                                                {EditorTabs[key] && EditorTabs[key](idx, sectionOrder.length)}
                                            </React.Fragment>
                                        ))}
                                    </>
                                );
                            })()}
`;

// Now replace the target toggle headers to inject renderOrderControls
renderBlock = renderBlock.replace(/<div className="flex align-items-center gap-3" onClick=\{e => e\.stopPropagation\(\)\}>/g, 
    '<div className="flex align-items-center gap-3" onClick={e => e.stopPropagation()}>\n                                        {renderOrderControls(idx, total)}');

// Put back
content = content.substring(0, startIdx) + renderBlock + content.substring(endIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully refactored ClientDashboard.tsx');
