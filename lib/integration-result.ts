export type IntegrationResult =
  | {
      ok: true;
      skipped?: false;
      status?: number;
    }
  | {
      ok: false;
      skipped?: boolean;
      status?: number;
      error: string;
    };
