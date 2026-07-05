export const ROLES = {
  KABID: "kepala bidang pdas",
  SUPERADMIN: "superadmin",
  STAFF: "staff pdas",
  KTH: "kelompok tani hutan (kth)"
};

export const ROLE_BASE_PATHS: Record<string, string> = {
  [ROLES.KABID]: "/admin/kabid",
  [ROLES.SUPERADMIN]: "/admin/kabid", 
  [ROLES.STAFF]: "/admin/staff",
  [ROLES.KTH]: "/admin/kth", 
};

export const ROLE_REDIRECTS: Record<string, string> = {
  ...ROLE_BASE_PATHS,
  "kepala dinas": "/admin/kabid",
  "admin": "/admin/staff",
  "staff pdas": "/admin/staff",
  "kelompok tani hutan (kth)": "/admin/kth",
};