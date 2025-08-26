import type { SVGProps } from 'react';
import { Cog } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return <Cog {...props} />;
}
