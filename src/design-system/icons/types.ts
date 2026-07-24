import type { LucideProps } from 'lucide-react-native';
import type { icons } from './icons';

export type IconName = keyof typeof icons;

export interface AppIconProps extends LucideProps {
  name: IconName;
}