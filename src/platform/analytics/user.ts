import { analyticsService } from './analytics.service';

export async function identifyUser(
  id: string,
) {
  await analyticsService.identify(id);
}

export async function setUserRole(
  role: string,
) {
  await analyticsService.setProperty(
    'role',
    role,
  );
}

export async function setTenant(
  tenantId: string,
) {
  await analyticsService.setProperty(
    'tenant_id',
    tenantId,
  );
}