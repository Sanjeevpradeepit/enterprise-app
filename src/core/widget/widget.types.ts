export interface WidgetUser {
  id: string;

  name: string;

  email?: string;

  avatar?: string;
}

export interface WidgetData {
  title: string;

  subtitle?: string;

  message?: string;

  badge?: number;

  image?: string;

  updatedAt?: string;

  user?: WidgetUser;
}

export interface WidgetBridge {
  updateWidget(
    data: WidgetData,
  ): Promise<void>;

  reloadWidget(): Promise<void>;

  clearWidget(): Promise<void>;
}