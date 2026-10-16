// Worker'ın dışarıdan beklediği bağlamalar (D1 ve ASSETS). Yalnız kullanılan parçalar tanımlanır.

export interface D1Sonuc {
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}

export interface D1Hazirlanmis {
  bind(...degerler: unknown[]): D1Sonuc;
}

export interface D1Like {
  prepare(sql: string): D1Hazirlanmis;
}

export interface Env {
  DB: D1Like;
  ASSETS: { fetch(istek: Request): Promise<Response> };
  /** Worker secret'ı; dosyaya ve repoya yazılmaz. */
  RESEND_API_KEY?: string;
  BULTEN_GONDEREN?: string;
  /** Worker secret'ı; mecmua-saat ile ortak, günlük görevi doğrular. */
  GOREV_ANAHTARI?: string;
}

export interface Bagimlilik {
  fetch?: typeof fetch;
  simdi?: () => Date;
}
