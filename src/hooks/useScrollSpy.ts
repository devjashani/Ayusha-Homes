import { useState, useEffect } from 'react';

/**
 * Scroll-spy hook determining active section based on the viewport center line.
 * Uses getBoundingClientRect to ensure absolute document accuracy even inside stacked/relative containers.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      // Over the hero (first 45% of viewport height), no section is active
      const heroThreshold = window.innerHeight * 0.45;
      if (window.scrollY < heroThreshold) {
        setActiveId('');
        return;
      }

      // Check section under the viewport centre line
      const centerLine = window.scrollY + window.innerHeight * 0.45;

      let found = '';
      for (const sectionId of sectionIds) {
        const id = sectionId.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;

          if (centerLine >= top && centerLine < bottom) {
            found = `#${id}`;
            break;
          }
        }
      }

      setActiveId(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
