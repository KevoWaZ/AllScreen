
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Person
 * 
 */
export type Person = $Result.DefaultSelection<Prisma.$PersonPayload>
/**
 * Model Movie
 * 
 */
export type Movie = $Result.DefaultSelection<Prisma.$MoviePayload>
/**
 * Model MovieGenre
 * 
 */
export type MovieGenre = $Result.DefaultSelection<Prisma.$MovieGenrePayload>
/**
 * Model ProductionCompany
 * 
 */
export type ProductionCompany = $Result.DefaultSelection<Prisma.$ProductionCompanyPayload>
/**
 * Model TVShow
 * 
 */
export type TVShow = $Result.DefaultSelection<Prisma.$TVShowPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model Watched
 * 
 */
export type Watched = $Result.DefaultSelection<Prisma.$WatchedPayload>
/**
 * Model Watchlist
 * 
 */
export type Watchlist = $Result.DefaultSelection<Prisma.$WatchlistPayload>
/**
 * Model List
 * 
 */
export type List = $Result.DefaultSelection<Prisma.$ListPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ShowType: {
  MOVIE: 'MOVIE',
  TVSHOW: 'TVSHOW'
};

export type ShowType = (typeof ShowType)[keyof typeof ShowType]

}

export type ShowType = $Enums.ShowType

export const ShowType: typeof $Enums.ShowType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movies
    * const movies = await prisma.movie.findMany()
    * ```
    */
  get movie(): Prisma.MovieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movieGenre`: Exposes CRUD operations for the **MovieGenre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MovieGenres
    * const movieGenres = await prisma.movieGenre.findMany()
    * ```
    */
  get movieGenre(): Prisma.MovieGenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productionCompany`: Exposes CRUD operations for the **ProductionCompany** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductionCompanies
    * const productionCompanies = await prisma.productionCompany.findMany()
    * ```
    */
  get productionCompany(): Prisma.ProductionCompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tVShow`: Exposes CRUD operations for the **TVShow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TVShows
    * const tVShows = await prisma.tVShow.findMany()
    * ```
    */
  get tVShow(): Prisma.TVShowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watched`: Exposes CRUD operations for the **Watched** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Watcheds
    * const watcheds = await prisma.watched.findMany()
    * ```
    */
  get watched(): Prisma.WatchedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchlist`: Exposes CRUD operations for the **Watchlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Watchlists
    * const watchlists = await prisma.watchlist.findMany()
    * ```
    */
  get watchlist(): Prisma.WatchlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.list`: Exposes CRUD operations for the **List** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lists
    * const lists = await prisma.list.findMany()
    * ```
    */
  get list(): Prisma.ListDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Person: 'Person',
    Movie: 'Movie',
    MovieGenre: 'MovieGenre',
    ProductionCompany: 'ProductionCompany',
    TVShow: 'TVShow',
    Review: 'Review',
    Watched: 'Watched',
    Watchlist: 'Watchlist',
    List: 'List'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "person" | "movie" | "movieGenre" | "productionCompany" | "tVShow" | "review" | "watched" | "watchlist" | "list"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Person: {
        payload: Prisma.$PersonPayload<ExtArgs>
        fields: Prisma.PersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findFirst: {
            args: Prisma.PersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findMany: {
            args: Prisma.PersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          create: {
            args: Prisma.PersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          createMany: {
            args: Prisma.PersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          delete: {
            args: Prisma.PersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          update: {
            args: Prisma.PersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          deleteMany: {
            args: Prisma.PersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          upsert: {
            args: Prisma.PersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          aggregate: {
            args: Prisma.PersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerson>
          }
          groupBy: {
            args: Prisma.PersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonCountArgs<ExtArgs>
            result: $Utils.Optional<PersonCountAggregateOutputType> | number
          }
        }
      }
      Movie: {
        payload: Prisma.$MoviePayload<ExtArgs>
        fields: Prisma.MovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findFirst: {
            args: Prisma.MovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findMany: {
            args: Prisma.MovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          create: {
            args: Prisma.MovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          createMany: {
            args: Prisma.MovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          delete: {
            args: Prisma.MovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          update: {
            args: Prisma.MovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          deleteMany: {
            args: Prisma.MovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          upsert: {
            args: Prisma.MovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          aggregate: {
            args: Prisma.MovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovie>
          }
          groupBy: {
            args: Prisma.MovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieCountArgs<ExtArgs>
            result: $Utils.Optional<MovieCountAggregateOutputType> | number
          }
        }
      }
      MovieGenre: {
        payload: Prisma.$MovieGenrePayload<ExtArgs>
        fields: Prisma.MovieGenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieGenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieGenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          findFirst: {
            args: Prisma.MovieGenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieGenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          findMany: {
            args: Prisma.MovieGenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>[]
          }
          create: {
            args: Prisma.MovieGenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          createMany: {
            args: Prisma.MovieGenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieGenreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>[]
          }
          delete: {
            args: Prisma.MovieGenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          update: {
            args: Prisma.MovieGenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          deleteMany: {
            args: Prisma.MovieGenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieGenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieGenreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>[]
          }
          upsert: {
            args: Prisma.MovieGenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          aggregate: {
            args: Prisma.MovieGenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovieGenre>
          }
          groupBy: {
            args: Prisma.MovieGenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieGenreCountArgs<ExtArgs>
            result: $Utils.Optional<MovieGenreCountAggregateOutputType> | number
          }
        }
      }
      ProductionCompany: {
        payload: Prisma.$ProductionCompanyPayload<ExtArgs>
        fields: Prisma.ProductionCompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductionCompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductionCompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>
          }
          findFirst: {
            args: Prisma.ProductionCompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductionCompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>
          }
          findMany: {
            args: Prisma.ProductionCompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>[]
          }
          create: {
            args: Prisma.ProductionCompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>
          }
          createMany: {
            args: Prisma.ProductionCompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductionCompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>[]
          }
          delete: {
            args: Prisma.ProductionCompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>
          }
          update: {
            args: Prisma.ProductionCompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>
          }
          deleteMany: {
            args: Prisma.ProductionCompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductionCompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductionCompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>[]
          }
          upsert: {
            args: Prisma.ProductionCompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionCompanyPayload>
          }
          aggregate: {
            args: Prisma.ProductionCompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductionCompany>
          }
          groupBy: {
            args: Prisma.ProductionCompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductionCompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductionCompanyCountArgs<ExtArgs>
            result: $Utils.Optional<ProductionCompanyCountAggregateOutputType> | number
          }
        }
      }
      TVShow: {
        payload: Prisma.$TVShowPayload<ExtArgs>
        fields: Prisma.TVShowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TVShowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TVShowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          findFirst: {
            args: Prisma.TVShowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TVShowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          findMany: {
            args: Prisma.TVShowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>[]
          }
          create: {
            args: Prisma.TVShowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          createMany: {
            args: Prisma.TVShowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TVShowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>[]
          }
          delete: {
            args: Prisma.TVShowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          update: {
            args: Prisma.TVShowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          deleteMany: {
            args: Prisma.TVShowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TVShowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TVShowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>[]
          }
          upsert: {
            args: Prisma.TVShowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TVShowPayload>
          }
          aggregate: {
            args: Prisma.TVShowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTVShow>
          }
          groupBy: {
            args: Prisma.TVShowGroupByArgs<ExtArgs>
            result: $Utils.Optional<TVShowGroupByOutputType>[]
          }
          count: {
            args: Prisma.TVShowCountArgs<ExtArgs>
            result: $Utils.Optional<TVShowCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Watched: {
        payload: Prisma.$WatchedPayload<ExtArgs>
        fields: Prisma.WatchedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>
          }
          findFirst: {
            args: Prisma.WatchedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>
          }
          findMany: {
            args: Prisma.WatchedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>[]
          }
          create: {
            args: Prisma.WatchedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>
          }
          createMany: {
            args: Prisma.WatchedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>[]
          }
          delete: {
            args: Prisma.WatchedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>
          }
          update: {
            args: Prisma.WatchedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>
          }
          deleteMany: {
            args: Prisma.WatchedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>[]
          }
          upsert: {
            args: Prisma.WatchedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchedPayload>
          }
          aggregate: {
            args: Prisma.WatchedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatched>
          }
          groupBy: {
            args: Prisma.WatchedGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchedGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchedCountArgs<ExtArgs>
            result: $Utils.Optional<WatchedCountAggregateOutputType> | number
          }
        }
      }
      Watchlist: {
        payload: Prisma.$WatchlistPayload<ExtArgs>
        fields: Prisma.WatchlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          findFirst: {
            args: Prisma.WatchlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          findMany: {
            args: Prisma.WatchlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          create: {
            args: Prisma.WatchlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          createMany: {
            args: Prisma.WatchlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          delete: {
            args: Prisma.WatchlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          update: {
            args: Prisma.WatchlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          deleteMany: {
            args: Prisma.WatchlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          upsert: {
            args: Prisma.WatchlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          aggregate: {
            args: Prisma.WatchlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchlist>
          }
          groupBy: {
            args: Prisma.WatchlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchlistCountArgs<ExtArgs>
            result: $Utils.Optional<WatchlistCountAggregateOutputType> | number
          }
        }
      }
      List: {
        payload: Prisma.$ListPayload<ExtArgs>
        fields: Prisma.ListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findFirst: {
            args: Prisma.ListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findMany: {
            args: Prisma.ListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          create: {
            args: Prisma.ListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          createMany: {
            args: Prisma.ListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          delete: {
            args: Prisma.ListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          update: {
            args: Prisma.ListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          deleteMany: {
            args: Prisma.ListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          upsert: {
            args: Prisma.ListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          aggregate: {
            args: Prisma.ListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateList>
          }
          groupBy: {
            args: Prisma.ListGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListCountArgs<ExtArgs>
            result: $Utils.Optional<ListCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    person?: PersonOmit
    movie?: MovieOmit
    movieGenre?: MovieGenreOmit
    productionCompany?: ProductionCompanyOmit
    tVShow?: TVShowOmit
    review?: ReviewOmit
    watched?: WatchedOmit
    watchlist?: WatchlistOmit
    list?: ListOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    lists: number
    reviews: number
    watched: number
    watchlists: number
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lists?: boolean | UserCountOutputTypeCountListsArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    watched?: boolean | UserCountOutputTypeCountWatchedArgs
    watchlists?: boolean | UserCountOutputTypeCountWatchlistsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchedWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type PersonCountOutputType
   */

  export type PersonCountOutputType = {
    directedMovies: number
    producedMovies: number
    execProducedMovies: number
    writtenMovies: number
    composedMovies: number
    cinematographyMovies: number
  }

  export type PersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directedMovies?: boolean | PersonCountOutputTypeCountDirectedMoviesArgs
    producedMovies?: boolean | PersonCountOutputTypeCountProducedMoviesArgs
    execProducedMovies?: boolean | PersonCountOutputTypeCountExecProducedMoviesArgs
    writtenMovies?: boolean | PersonCountOutputTypeCountWrittenMoviesArgs
    composedMovies?: boolean | PersonCountOutputTypeCountComposedMoviesArgs
    cinematographyMovies?: boolean | PersonCountOutputTypeCountCinematographyMoviesArgs
  }

  // Custom InputTypes
  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: PersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountDirectedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountProducedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountExecProducedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountWrittenMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountComposedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountCinematographyMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }


  /**
   * Count Type MovieCountOutputType
   */

  export type MovieCountOutputType = {
    genres: number
    productionCompanies: number
    reviews: number
    watched: number
    watchlists: number
    lists: number
    directors: number
    producers: number
    execProducers: number
    writers: number
    composers: number
    cinematographers: number
  }

  export type MovieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | MovieCountOutputTypeCountGenresArgs
    productionCompanies?: boolean | MovieCountOutputTypeCountProductionCompaniesArgs
    reviews?: boolean | MovieCountOutputTypeCountReviewsArgs
    watched?: boolean | MovieCountOutputTypeCountWatchedArgs
    watchlists?: boolean | MovieCountOutputTypeCountWatchlistsArgs
    lists?: boolean | MovieCountOutputTypeCountListsArgs
    directors?: boolean | MovieCountOutputTypeCountDirectorsArgs
    producers?: boolean | MovieCountOutputTypeCountProducersArgs
    execProducers?: boolean | MovieCountOutputTypeCountExecProducersArgs
    writers?: boolean | MovieCountOutputTypeCountWritersArgs
    composers?: boolean | MovieCountOutputTypeCountComposersArgs
    cinematographers?: boolean | MovieCountOutputTypeCountCinematographersArgs
  }

  // Custom InputTypes
  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieCountOutputType
     */
    select?: MovieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieGenreWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountProductionCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionCompanyWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountWatchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchedWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountWatchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountDirectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountProducersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountExecProducersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountWritersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountComposersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountCinematographersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }


  /**
   * Count Type MovieGenreCountOutputType
   */

  export type MovieGenreCountOutputType = {
    movies: number
  }

  export type MovieGenreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | MovieGenreCountOutputTypeCountMoviesArgs
  }

  // Custom InputTypes
  /**
   * MovieGenreCountOutputType without action
   */
  export type MovieGenreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenreCountOutputType
     */
    select?: MovieGenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MovieGenreCountOutputType without action
   */
  export type MovieGenreCountOutputTypeCountMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }


  /**
   * Count Type ProductionCompanyCountOutputType
   */

  export type ProductionCompanyCountOutputType = {
    movies: number
  }

  export type ProductionCompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | ProductionCompanyCountOutputTypeCountMoviesArgs
  }

  // Custom InputTypes
  /**
   * ProductionCompanyCountOutputType without action
   */
  export type ProductionCompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompanyCountOutputType
     */
    select?: ProductionCompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductionCompanyCountOutputType without action
   */
  export type ProductionCompanyCountOutputTypeCountMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }


  /**
   * Count Type TVShowCountOutputType
   */

  export type TVShowCountOutputType = {
    reviews: number
    watched: number
    watchlists: number
    lists: number
  }

  export type TVShowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | TVShowCountOutputTypeCountReviewsArgs
    watched?: boolean | TVShowCountOutputTypeCountWatchedArgs
    watchlists?: boolean | TVShowCountOutputTypeCountWatchlistsArgs
    lists?: boolean | TVShowCountOutputTypeCountListsArgs
  }

  // Custom InputTypes
  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShowCountOutputType
     */
    select?: TVShowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeCountWatchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchedWhereInput
  }

  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeCountWatchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
  }

  /**
   * TVShowCountOutputType without action
   */
  export type TVShowCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }


  /**
   * Count Type ListCountOutputType
   */

  export type ListCountOutputType = {
    movies: number
    TVShows: number
  }

  export type ListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | ListCountOutputTypeCountMoviesArgs
    TVShows?: boolean | ListCountOutputTypeCountTVShowsArgs
  }

  // Custom InputTypes
  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListCountOutputType
     */
    select?: ListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeCountMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
  }

  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeCountTVShowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TVShowWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    bio: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    bio: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    bio: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    bio?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    bio?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    bio?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    bio: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
    lists?: boolean | User$listsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    watched?: boolean | User$watchedArgs<ExtArgs>
    watchlists?: boolean | User$watchlistsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bio?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "bio", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lists?: boolean | User$listsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    watched?: boolean | User$watchedArgs<ExtArgs>
    watchlists?: boolean | User$watchlistsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      lists: Prisma.$ListPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      watched: Prisma.$WatchedPayload<ExtArgs>[]
      watchlists: Prisma.$WatchlistPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      bio: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lists<T extends User$listsArgs<ExtArgs> = {}>(args?: Subset<T, User$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watched<T extends User$watchedArgs<ExtArgs> = {}>(args?: Subset<T, User$watchedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchlists<T extends User$watchlistsArgs<ExtArgs> = {}>(args?: Subset<T, User$watchlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly bio: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.lists
   */
  export type User$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.watched
   */
  export type User$watchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    where?: WatchedWhereInput
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    cursor?: WatchedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchedScalarFieldEnum | WatchedScalarFieldEnum[]
  }

  /**
   * User.watchlists
   */
  export type User$watchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    cursor?: WatchlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Person
   */

  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  export type PersonAvgAggregateOutputType = {
    id: number | null
  }

  export type PersonSumAggregateOutputType = {
    id: number | null
  }

  export type PersonMinAggregateOutputType = {
    id: number | null
    name: string | null
    profile_path: string | null
  }

  export type PersonMaxAggregateOutputType = {
    id: number | null
    name: string | null
    profile_path: string | null
  }

  export type PersonCountAggregateOutputType = {
    id: number
    name: number
    profile_path: number
    job: number
    _all: number
  }


  export type PersonAvgAggregateInputType = {
    id?: true
  }

  export type PersonSumAggregateInputType = {
    id?: true
  }

  export type PersonMinAggregateInputType = {
    id?: true
    name?: true
    profile_path?: true
  }

  export type PersonMaxAggregateInputType = {
    id?: true
    name?: true
    profile_path?: true
  }

  export type PersonCountAggregateInputType = {
    id?: true
    name?: true
    profile_path?: true
    job?: true
    _all?: true
  }

  export type PersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }




  export type PersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithAggregationInput | PersonOrderByWithAggregationInput[]
    by: PersonScalarFieldEnum[] | PersonScalarFieldEnum
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _avg?: PersonAvgAggregateInputType
    _sum?: PersonSumAggregateInputType
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }

  export type PersonGroupByOutputType = {
    id: number
    name: string
    profile_path: string
    job: string[]
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonGroupByOutputType[P]>
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      >
    >


  export type PersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    profile_path?: boolean
    job?: boolean
    directedMovies?: boolean | Person$directedMoviesArgs<ExtArgs>
    producedMovies?: boolean | Person$producedMoviesArgs<ExtArgs>
    execProducedMovies?: boolean | Person$execProducedMoviesArgs<ExtArgs>
    writtenMovies?: boolean | Person$writtenMoviesArgs<ExtArgs>
    composedMovies?: boolean | Person$composedMoviesArgs<ExtArgs>
    cinematographyMovies?: boolean | Person$cinematographyMoviesArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    profile_path?: boolean
    job?: boolean
  }, ExtArgs["result"]["person"]>

  export type PersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    profile_path?: boolean
    job?: boolean
  }, ExtArgs["result"]["person"]>

  export type PersonSelectScalar = {
    id?: boolean
    name?: boolean
    profile_path?: boolean
    job?: boolean
  }

  export type PersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "profile_path" | "job", ExtArgs["result"]["person"]>
  export type PersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    directedMovies?: boolean | Person$directedMoviesArgs<ExtArgs>
    producedMovies?: boolean | Person$producedMoviesArgs<ExtArgs>
    execProducedMovies?: boolean | Person$execProducedMoviesArgs<ExtArgs>
    writtenMovies?: boolean | Person$writtenMoviesArgs<ExtArgs>
    composedMovies?: boolean | Person$composedMoviesArgs<ExtArgs>
    cinematographyMovies?: boolean | Person$cinematographyMoviesArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Person"
    objects: {
      directedMovies: Prisma.$MoviePayload<ExtArgs>[]
      producedMovies: Prisma.$MoviePayload<ExtArgs>[]
      execProducedMovies: Prisma.$MoviePayload<ExtArgs>[]
      writtenMovies: Prisma.$MoviePayload<ExtArgs>[]
      composedMovies: Prisma.$MoviePayload<ExtArgs>[]
      cinematographyMovies: Prisma.$MoviePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      profile_path: string
      job: string[]
    }, ExtArgs["result"]["person"]>
    composites: {}
  }

  type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = $Result.GetResult<Prisma.$PersonPayload, S>

  type PersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonCountAggregateInputType | true
    }

  export interface PersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Person'], meta: { name: 'Person' } }
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonFindManyArgs>(args?: SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
     */
    create<T extends PersonCreateArgs>(args: SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonCreateManyArgs>(args?: SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `id`
     * const personWithIdOnly = await prisma.person.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
     */
    delete<T extends PersonDeleteArgs>(args: SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonUpdateArgs>(args: SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonUpdateManyArgs>(args: SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `id`
     * const personWithIdOnly = await prisma.person.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Person model
   */
  readonly fields: PersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    directedMovies<T extends Person$directedMoviesArgs<ExtArgs> = {}>(args?: Subset<T, Person$directedMoviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    producedMovies<T extends Person$producedMoviesArgs<ExtArgs> = {}>(args?: Subset<T, Person$producedMoviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    execProducedMovies<T extends Person$execProducedMoviesArgs<ExtArgs> = {}>(args?: Subset<T, Person$execProducedMoviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    writtenMovies<T extends Person$writtenMoviesArgs<ExtArgs> = {}>(args?: Subset<T, Person$writtenMoviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    composedMovies<T extends Person$composedMoviesArgs<ExtArgs> = {}>(args?: Subset<T, Person$composedMoviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cinematographyMovies<T extends Person$cinematographyMoviesArgs<ExtArgs> = {}>(args?: Subset<T, Person$cinematographyMoviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Person model
   */
  interface PersonFieldRefs {
    readonly id: FieldRef<"Person", 'Int'>
    readonly name: FieldRef<"Person", 'String'>
    readonly profile_path: FieldRef<"Person", 'String'>
    readonly job: FieldRef<"Person", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findUniqueOrThrow
   */
  export type PersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findFirstOrThrow
   */
  export type PersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findMany
   */
  export type PersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person create
   */
  export type PersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to create a Person.
     */
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }

  /**
   * Person createMany
   */
  export type PersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person createManyAndReturn
   */
  export type PersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person update
   */
  export type PersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to update a Person.
     */
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person updateManyAndReturn
   */
  export type PersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person upsert
   */
  export type PersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }

  /**
   * Person delete
   */
  export type PersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter which Person to delete.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * Person.directedMovies
   */
  export type Person$directedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Person.producedMovies
   */
  export type Person$producedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Person.execProducedMovies
   */
  export type Person$execProducedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Person.writtenMovies
   */
  export type Person$writtenMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Person.composedMovies
   */
  export type Person$composedMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Person.cinematographyMovies
   */
  export type Person$cinematographyMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Person without action
   */
  export type PersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
  }


  /**
   * Model Movie
   */

  export type AggregateMovie = {
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  export type MovieAvgAggregateOutputType = {
    id: number | null
    runtime: number | null
  }

  export type MovieSumAggregateOutputType = {
    id: number | null
    runtime: number | null
  }

  export type MovieMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    poster: string | null
    release_date: Date | null
    runtime: number | null
  }

  export type MovieMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    poster: string | null
    release_date: Date | null
    runtime: number | null
  }

  export type MovieCountAggregateOutputType = {
    id: number
    title: number
    description: number
    poster: number
    release_date: number
    runtime: number
    _all: number
  }


  export type MovieAvgAggregateInputType = {
    id?: true
    runtime?: true
  }

  export type MovieSumAggregateInputType = {
    id?: true
    runtime?: true
  }

  export type MovieMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    poster?: true
    release_date?: true
    runtime?: true
  }

  export type MovieMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    poster?: true
    release_date?: true
    runtime?: true
  }

  export type MovieCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    poster?: true
    release_date?: true
    runtime?: true
    _all?: true
  }

  export type MovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movie to aggregate.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movies
    **/
    _count?: true | MovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieMaxAggregateInputType
  }

  export type GetMovieAggregateType<T extends MovieAggregateArgs> = {
        [P in keyof T & keyof AggregateMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovie[P]>
      : GetScalarType<T[P], AggregateMovie[P]>
  }




  export type MovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithAggregationInput | MovieOrderByWithAggregationInput[]
    by: MovieScalarFieldEnum[] | MovieScalarFieldEnum
    having?: MovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieCountAggregateInputType | true
    _avg?: MovieAvgAggregateInputType
    _sum?: MovieSumAggregateInputType
    _min?: MovieMinAggregateInputType
    _max?: MovieMaxAggregateInputType
  }

  export type MovieGroupByOutputType = {
    id: number
    title: string
    description: string | null
    poster: string | null
    release_date: Date | null
    runtime: number | null
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  type GetMovieGroupByPayload<T extends MovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGroupByOutputType[P]>
        }
      >
    >


  export type MovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    release_date?: boolean
    runtime?: boolean
    genres?: boolean | Movie$genresArgs<ExtArgs>
    productionCompanies?: boolean | Movie$productionCompaniesArgs<ExtArgs>
    reviews?: boolean | Movie$reviewsArgs<ExtArgs>
    watched?: boolean | Movie$watchedArgs<ExtArgs>
    watchlists?: boolean | Movie$watchlistsArgs<ExtArgs>
    lists?: boolean | Movie$listsArgs<ExtArgs>
    directors?: boolean | Movie$directorsArgs<ExtArgs>
    producers?: boolean | Movie$producersArgs<ExtArgs>
    execProducers?: boolean | Movie$execProducersArgs<ExtArgs>
    writers?: boolean | Movie$writersArgs<ExtArgs>
    composers?: boolean | Movie$composersArgs<ExtArgs>
    cinematographers?: boolean | Movie$cinematographersArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    release_date?: boolean
    runtime?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    release_date?: boolean
    runtime?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    release_date?: boolean
    runtime?: boolean
  }

  export type MovieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "poster" | "release_date" | "runtime", ExtArgs["result"]["movie"]>
  export type MovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | Movie$genresArgs<ExtArgs>
    productionCompanies?: boolean | Movie$productionCompaniesArgs<ExtArgs>
    reviews?: boolean | Movie$reviewsArgs<ExtArgs>
    watched?: boolean | Movie$watchedArgs<ExtArgs>
    watchlists?: boolean | Movie$watchlistsArgs<ExtArgs>
    lists?: boolean | Movie$listsArgs<ExtArgs>
    directors?: boolean | Movie$directorsArgs<ExtArgs>
    producers?: boolean | Movie$producersArgs<ExtArgs>
    execProducers?: boolean | Movie$execProducersArgs<ExtArgs>
    writers?: boolean | Movie$writersArgs<ExtArgs>
    composers?: boolean | Movie$composersArgs<ExtArgs>
    cinematographers?: boolean | Movie$cinematographersArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MovieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movie"
    objects: {
      genres: Prisma.$MovieGenrePayload<ExtArgs>[]
      productionCompanies: Prisma.$ProductionCompanyPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      watched: Prisma.$WatchedPayload<ExtArgs>[]
      watchlists: Prisma.$WatchlistPayload<ExtArgs>[]
      lists: Prisma.$ListPayload<ExtArgs>[]
      directors: Prisma.$PersonPayload<ExtArgs>[]
      producers: Prisma.$PersonPayload<ExtArgs>[]
      execProducers: Prisma.$PersonPayload<ExtArgs>[]
      writers: Prisma.$PersonPayload<ExtArgs>[]
      composers: Prisma.$PersonPayload<ExtArgs>[]
      cinematographers: Prisma.$PersonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      poster: string | null
      release_date: Date | null
      runtime: number | null
    }, ExtArgs["result"]["movie"]>
    composites: {}
  }

  type MovieGetPayload<S extends boolean | null | undefined | MovieDefaultArgs> = $Result.GetResult<Prisma.$MoviePayload, S>

  type MovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieCountAggregateInputType | true
    }

  export interface MovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movie'], meta: { name: 'Movie' } }
    /**
     * Find zero or one Movie that matches the filter.
     * @param {MovieFindUniqueArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieFindUniqueArgs>(args: SelectSubset<T, MovieFindUniqueArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieFindUniqueOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieFindFirstArgs>(args?: SelectSubset<T, MovieFindFirstArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movies
     * const movies = await prisma.movie.findMany()
     * 
     * // Get first 10 Movies
     * const movies = await prisma.movie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movieWithIdOnly = await prisma.movie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovieFindManyArgs>(args?: SelectSubset<T, MovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movie.
     * @param {MovieCreateArgs} args - Arguments to create a Movie.
     * @example
     * // Create one Movie
     * const Movie = await prisma.movie.create({
     *   data: {
     *     // ... data to create a Movie
     *   }
     * })
     * 
     */
    create<T extends MovieCreateArgs>(args: SelectSubset<T, MovieCreateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movies.
     * @param {MovieCreateManyArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieCreateManyArgs>(args?: SelectSubset<T, MovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movies and returns the data saved in the database.
     * @param {MovieCreateManyAndReturnArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movie.
     * @param {MovieDeleteArgs} args - Arguments to delete one Movie.
     * @example
     * // Delete one Movie
     * const Movie = await prisma.movie.delete({
     *   where: {
     *     // ... filter to delete one Movie
     *   }
     * })
     * 
     */
    delete<T extends MovieDeleteArgs>(args: SelectSubset<T, MovieDeleteArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movie.
     * @param {MovieUpdateArgs} args - Arguments to update one Movie.
     * @example
     * // Update one Movie
     * const movie = await prisma.movie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieUpdateArgs>(args: SelectSubset<T, MovieUpdateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movies.
     * @param {MovieDeleteManyArgs} args - Arguments to filter Movies to delete.
     * @example
     * // Delete a few Movies
     * const { count } = await prisma.movie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieDeleteManyArgs>(args?: SelectSubset<T, MovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieUpdateManyArgs>(args: SelectSubset<T, MovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies and returns the data updated in the database.
     * @param {MovieUpdateManyAndReturnArgs} args - Arguments to update many Movies.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movie.
     * @param {MovieUpsertArgs} args - Arguments to update or create a Movie.
     * @example
     * // Update or create a Movie
     * const movie = await prisma.movie.upsert({
     *   create: {
     *     // ... data to create a Movie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movie we want to update
     *   }
     * })
     */
    upsert<T extends MovieUpsertArgs>(args: SelectSubset<T, MovieUpsertArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieCountArgs} args - Arguments to filter Movies to count.
     * @example
     * // Count the number of Movies
     * const count = await prisma.movie.count({
     *   where: {
     *     // ... the filter for the Movies we want to count
     *   }
     * })
    **/
    count<T extends MovieCountArgs>(
      args?: Subset<T, MovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieAggregateArgs>(args: Subset<T, MovieAggregateArgs>): Prisma.PrismaPromise<GetMovieAggregateType<T>>

    /**
     * Group by Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGroupByArgs['orderBy'] }
        : { orderBy?: MovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movie model
   */
  readonly fields: MovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    genres<T extends Movie$genresArgs<ExtArgs> = {}>(args?: Subset<T, Movie$genresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productionCompanies<T extends Movie$productionCompaniesArgs<ExtArgs> = {}>(args?: Subset<T, Movie$productionCompaniesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Movie$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watched<T extends Movie$watchedArgs<ExtArgs> = {}>(args?: Subset<T, Movie$watchedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchlists<T extends Movie$watchlistsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$watchlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lists<T extends Movie$listsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    directors<T extends Movie$directorsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$directorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    producers<T extends Movie$producersArgs<ExtArgs> = {}>(args?: Subset<T, Movie$producersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    execProducers<T extends Movie$execProducersArgs<ExtArgs> = {}>(args?: Subset<T, Movie$execProducersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    writers<T extends Movie$writersArgs<ExtArgs> = {}>(args?: Subset<T, Movie$writersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    composers<T extends Movie$composersArgs<ExtArgs> = {}>(args?: Subset<T, Movie$composersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cinematographers<T extends Movie$cinematographersArgs<ExtArgs> = {}>(args?: Subset<T, Movie$cinematographersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movie model
   */
  interface MovieFieldRefs {
    readonly id: FieldRef<"Movie", 'Int'>
    readonly title: FieldRef<"Movie", 'String'>
    readonly description: FieldRef<"Movie", 'String'>
    readonly poster: FieldRef<"Movie", 'String'>
    readonly release_date: FieldRef<"Movie", 'DateTime'>
    readonly runtime: FieldRef<"Movie", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Movie findUnique
   */
  export type MovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findUniqueOrThrow
   */
  export type MovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findFirst
   */
  export type MovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findFirstOrThrow
   */
  export type MovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findMany
   */
  export type MovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movies to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie create
   */
  export type MovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to create a Movie.
     */
    data: XOR<MovieCreateInput, MovieUncheckedCreateInput>
  }

  /**
   * Movie createMany
   */
  export type MovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie createManyAndReturn
   */
  export type MovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie update
   */
  export type MovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to update a Movie.
     */
    data: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
    /**
     * Choose, which Movie to update.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie updateMany
   */
  export type MovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie updateManyAndReturn
   */
  export type MovieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie upsert
   */
  export type MovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The filter to search for the Movie to update in case it exists.
     */
    where: MovieWhereUniqueInput
    /**
     * In case the Movie found by the `where` argument doesn't exist, create a new Movie with this data.
     */
    create: XOR<MovieCreateInput, MovieUncheckedCreateInput>
    /**
     * In case the Movie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
  }

  /**
   * Movie delete
   */
  export type MovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter which Movie to delete.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie deleteMany
   */
  export type MovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movies to delete
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to delete.
     */
    limit?: number
  }

  /**
   * Movie.genres
   */
  export type Movie$genresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    where?: MovieGenreWhereInput
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    cursor?: MovieGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * Movie.productionCompanies
   */
  export type Movie$productionCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    where?: ProductionCompanyWhereInput
    orderBy?: ProductionCompanyOrderByWithRelationInput | ProductionCompanyOrderByWithRelationInput[]
    cursor?: ProductionCompanyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductionCompanyScalarFieldEnum | ProductionCompanyScalarFieldEnum[]
  }

  /**
   * Movie.reviews
   */
  export type Movie$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Movie.watched
   */
  export type Movie$watchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    where?: WatchedWhereInput
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    cursor?: WatchedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchedScalarFieldEnum | WatchedScalarFieldEnum[]
  }

  /**
   * Movie.watchlists
   */
  export type Movie$watchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    cursor?: WatchlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Movie.lists
   */
  export type Movie$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * Movie.directors
   */
  export type Movie$directorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Movie.producers
   */
  export type Movie$producersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Movie.execProducers
   */
  export type Movie$execProducersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Movie.writers
   */
  export type Movie$writersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Movie.composers
   */
  export type Movie$composersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Movie.cinematographers
   */
  export type Movie$cinematographersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Movie without action
   */
  export type MovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
  }


  /**
   * Model MovieGenre
   */

  export type AggregateMovieGenre = {
    _count: MovieGenreCountAggregateOutputType | null
    _avg: MovieGenreAvgAggregateOutputType | null
    _sum: MovieGenreSumAggregateOutputType | null
    _min: MovieGenreMinAggregateOutputType | null
    _max: MovieGenreMaxAggregateOutputType | null
  }

  export type MovieGenreAvgAggregateOutputType = {
    id: number | null
  }

  export type MovieGenreSumAggregateOutputType = {
    id: number | null
  }

  export type MovieGenreMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type MovieGenreMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type MovieGenreCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type MovieGenreAvgAggregateInputType = {
    id?: true
  }

  export type MovieGenreSumAggregateInputType = {
    id?: true
  }

  export type MovieGenreMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type MovieGenreMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type MovieGenreCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type MovieGenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovieGenre to aggregate.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MovieGenres
    **/
    _count?: true | MovieGenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieGenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieGenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieGenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieGenreMaxAggregateInputType
  }

  export type GetMovieGenreAggregateType<T extends MovieGenreAggregateArgs> = {
        [P in keyof T & keyof AggregateMovieGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovieGenre[P]>
      : GetScalarType<T[P], AggregateMovieGenre[P]>
  }




  export type MovieGenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieGenreWhereInput
    orderBy?: MovieGenreOrderByWithAggregationInput | MovieGenreOrderByWithAggregationInput[]
    by: MovieGenreScalarFieldEnum[] | MovieGenreScalarFieldEnum
    having?: MovieGenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieGenreCountAggregateInputType | true
    _avg?: MovieGenreAvgAggregateInputType
    _sum?: MovieGenreSumAggregateInputType
    _min?: MovieGenreMinAggregateInputType
    _max?: MovieGenreMaxAggregateInputType
  }

  export type MovieGenreGroupByOutputType = {
    id: number
    name: string
    _count: MovieGenreCountAggregateOutputType | null
    _avg: MovieGenreAvgAggregateOutputType | null
    _sum: MovieGenreSumAggregateOutputType | null
    _min: MovieGenreMinAggregateOutputType | null
    _max: MovieGenreMaxAggregateOutputType | null
  }

  type GetMovieGenreGroupByPayload<T extends MovieGenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGenreGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGenreGroupByOutputType[P]>
        }
      >
    >


  export type MovieGenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    movies?: boolean | MovieGenre$moviesArgs<ExtArgs>
    _count?: boolean | MovieGenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieGenre"]>

  export type MovieGenreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["movieGenre"]>

  export type MovieGenreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["movieGenre"]>

  export type MovieGenreSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type MovieGenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["movieGenre"]>
  export type MovieGenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | MovieGenre$moviesArgs<ExtArgs>
    _count?: boolean | MovieGenreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MovieGenreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MovieGenreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MovieGenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MovieGenre"
    objects: {
      movies: Prisma.$MoviePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["movieGenre"]>
    composites: {}
  }

  type MovieGenreGetPayload<S extends boolean | null | undefined | MovieGenreDefaultArgs> = $Result.GetResult<Prisma.$MovieGenrePayload, S>

  type MovieGenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieGenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieGenreCountAggregateInputType | true
    }

  export interface MovieGenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MovieGenre'], meta: { name: 'MovieGenre' } }
    /**
     * Find zero or one MovieGenre that matches the filter.
     * @param {MovieGenreFindUniqueArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieGenreFindUniqueArgs>(args: SelectSubset<T, MovieGenreFindUniqueArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MovieGenre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieGenreFindUniqueOrThrowArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieGenreFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieGenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MovieGenre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreFindFirstArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieGenreFindFirstArgs>(args?: SelectSubset<T, MovieGenreFindFirstArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MovieGenre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreFindFirstOrThrowArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieGenreFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieGenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MovieGenres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MovieGenres
     * const movieGenres = await prisma.movieGenre.findMany()
     * 
     * // Get first 10 MovieGenres
     * const movieGenres = await prisma.movieGenre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movieGenreWithIdOnly = await prisma.movieGenre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovieGenreFindManyArgs>(args?: SelectSubset<T, MovieGenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MovieGenre.
     * @param {MovieGenreCreateArgs} args - Arguments to create a MovieGenre.
     * @example
     * // Create one MovieGenre
     * const MovieGenre = await prisma.movieGenre.create({
     *   data: {
     *     // ... data to create a MovieGenre
     *   }
     * })
     * 
     */
    create<T extends MovieGenreCreateArgs>(args: SelectSubset<T, MovieGenreCreateArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MovieGenres.
     * @param {MovieGenreCreateManyArgs} args - Arguments to create many MovieGenres.
     * @example
     * // Create many MovieGenres
     * const movieGenre = await prisma.movieGenre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieGenreCreateManyArgs>(args?: SelectSubset<T, MovieGenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MovieGenres and returns the data saved in the database.
     * @param {MovieGenreCreateManyAndReturnArgs} args - Arguments to create many MovieGenres.
     * @example
     * // Create many MovieGenres
     * const movieGenre = await prisma.movieGenre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MovieGenres and only return the `id`
     * const movieGenreWithIdOnly = await prisma.movieGenre.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieGenreCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieGenreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MovieGenre.
     * @param {MovieGenreDeleteArgs} args - Arguments to delete one MovieGenre.
     * @example
     * // Delete one MovieGenre
     * const MovieGenre = await prisma.movieGenre.delete({
     *   where: {
     *     // ... filter to delete one MovieGenre
     *   }
     * })
     * 
     */
    delete<T extends MovieGenreDeleteArgs>(args: SelectSubset<T, MovieGenreDeleteArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MovieGenre.
     * @param {MovieGenreUpdateArgs} args - Arguments to update one MovieGenre.
     * @example
     * // Update one MovieGenre
     * const movieGenre = await prisma.movieGenre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieGenreUpdateArgs>(args: SelectSubset<T, MovieGenreUpdateArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MovieGenres.
     * @param {MovieGenreDeleteManyArgs} args - Arguments to filter MovieGenres to delete.
     * @example
     * // Delete a few MovieGenres
     * const { count } = await prisma.movieGenre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieGenreDeleteManyArgs>(args?: SelectSubset<T, MovieGenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovieGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MovieGenres
     * const movieGenre = await prisma.movieGenre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieGenreUpdateManyArgs>(args: SelectSubset<T, MovieGenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovieGenres and returns the data updated in the database.
     * @param {MovieGenreUpdateManyAndReturnArgs} args - Arguments to update many MovieGenres.
     * @example
     * // Update many MovieGenres
     * const movieGenre = await prisma.movieGenre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MovieGenres and only return the `id`
     * const movieGenreWithIdOnly = await prisma.movieGenre.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieGenreUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieGenreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MovieGenre.
     * @param {MovieGenreUpsertArgs} args - Arguments to update or create a MovieGenre.
     * @example
     * // Update or create a MovieGenre
     * const movieGenre = await prisma.movieGenre.upsert({
     *   create: {
     *     // ... data to create a MovieGenre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MovieGenre we want to update
     *   }
     * })
     */
    upsert<T extends MovieGenreUpsertArgs>(args: SelectSubset<T, MovieGenreUpsertArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MovieGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreCountArgs} args - Arguments to filter MovieGenres to count.
     * @example
     * // Count the number of MovieGenres
     * const count = await prisma.movieGenre.count({
     *   where: {
     *     // ... the filter for the MovieGenres we want to count
     *   }
     * })
    **/
    count<T extends MovieGenreCountArgs>(
      args?: Subset<T, MovieGenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieGenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MovieGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieGenreAggregateArgs>(args: Subset<T, MovieGenreAggregateArgs>): Prisma.PrismaPromise<GetMovieGenreAggregateType<T>>

    /**
     * Group by MovieGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGenreGroupByArgs['orderBy'] }
        : { orderBy?: MovieGenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MovieGenre model
   */
  readonly fields: MovieGenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MovieGenre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieGenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movies<T extends MovieGenre$moviesArgs<ExtArgs> = {}>(args?: Subset<T, MovieGenre$moviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MovieGenre model
   */
  interface MovieGenreFieldRefs {
    readonly id: FieldRef<"MovieGenre", 'Int'>
    readonly name: FieldRef<"MovieGenre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MovieGenre findUnique
   */
  export type MovieGenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre findUniqueOrThrow
   */
  export type MovieGenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre findFirst
   */
  export type MovieGenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovieGenres.
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovieGenres.
     */
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * MovieGenre findFirstOrThrow
   */
  export type MovieGenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovieGenres.
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovieGenres.
     */
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * MovieGenre findMany
   */
  export type MovieGenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenres to fetch.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MovieGenres.
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * MovieGenre create
   */
  export type MovieGenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * The data needed to create a MovieGenre.
     */
    data: XOR<MovieGenreCreateInput, MovieGenreUncheckedCreateInput>
  }

  /**
   * MovieGenre createMany
   */
  export type MovieGenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MovieGenres.
     */
    data: MovieGenreCreateManyInput | MovieGenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MovieGenre createManyAndReturn
   */
  export type MovieGenreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * The data used to create many MovieGenres.
     */
    data: MovieGenreCreateManyInput | MovieGenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MovieGenre update
   */
  export type MovieGenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * The data needed to update a MovieGenre.
     */
    data: XOR<MovieGenreUpdateInput, MovieGenreUncheckedUpdateInput>
    /**
     * Choose, which MovieGenre to update.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre updateMany
   */
  export type MovieGenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MovieGenres.
     */
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyInput>
    /**
     * Filter which MovieGenres to update
     */
    where?: MovieGenreWhereInput
    /**
     * Limit how many MovieGenres to update.
     */
    limit?: number
  }

  /**
   * MovieGenre updateManyAndReturn
   */
  export type MovieGenreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * The data used to update MovieGenres.
     */
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyInput>
    /**
     * Filter which MovieGenres to update
     */
    where?: MovieGenreWhereInput
    /**
     * Limit how many MovieGenres to update.
     */
    limit?: number
  }

  /**
   * MovieGenre upsert
   */
  export type MovieGenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * The filter to search for the MovieGenre to update in case it exists.
     */
    where: MovieGenreWhereUniqueInput
    /**
     * In case the MovieGenre found by the `where` argument doesn't exist, create a new MovieGenre with this data.
     */
    create: XOR<MovieGenreCreateInput, MovieGenreUncheckedCreateInput>
    /**
     * In case the MovieGenre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieGenreUpdateInput, MovieGenreUncheckedUpdateInput>
  }

  /**
   * MovieGenre delete
   */
  export type MovieGenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter which MovieGenre to delete.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre deleteMany
   */
  export type MovieGenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovieGenres to delete
     */
    where?: MovieGenreWhereInput
    /**
     * Limit how many MovieGenres to delete.
     */
    limit?: number
  }

  /**
   * MovieGenre.movies
   */
  export type MovieGenre$moviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * MovieGenre without action
   */
  export type MovieGenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
  }


  /**
   * Model ProductionCompany
   */

  export type AggregateProductionCompany = {
    _count: ProductionCompanyCountAggregateOutputType | null
    _avg: ProductionCompanyAvgAggregateOutputType | null
    _sum: ProductionCompanySumAggregateOutputType | null
    _min: ProductionCompanyMinAggregateOutputType | null
    _max: ProductionCompanyMaxAggregateOutputType | null
  }

  export type ProductionCompanyAvgAggregateOutputType = {
    id: number | null
  }

  export type ProductionCompanySumAggregateOutputType = {
    id: number | null
  }

  export type ProductionCompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type ProductionCompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type ProductionCompanyCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type ProductionCompanyAvgAggregateInputType = {
    id?: true
  }

  export type ProductionCompanySumAggregateInputType = {
    id?: true
  }

  export type ProductionCompanyMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type ProductionCompanyMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type ProductionCompanyCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type ProductionCompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionCompany to aggregate.
     */
    where?: ProductionCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionCompanies to fetch.
     */
    orderBy?: ProductionCompanyOrderByWithRelationInput | ProductionCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductionCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductionCompanies
    **/
    _count?: true | ProductionCompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductionCompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductionCompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductionCompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductionCompanyMaxAggregateInputType
  }

  export type GetProductionCompanyAggregateType<T extends ProductionCompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateProductionCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductionCompany[P]>
      : GetScalarType<T[P], AggregateProductionCompany[P]>
  }




  export type ProductionCompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionCompanyWhereInput
    orderBy?: ProductionCompanyOrderByWithAggregationInput | ProductionCompanyOrderByWithAggregationInput[]
    by: ProductionCompanyScalarFieldEnum[] | ProductionCompanyScalarFieldEnum
    having?: ProductionCompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductionCompanyCountAggregateInputType | true
    _avg?: ProductionCompanyAvgAggregateInputType
    _sum?: ProductionCompanySumAggregateInputType
    _min?: ProductionCompanyMinAggregateInputType
    _max?: ProductionCompanyMaxAggregateInputType
  }

  export type ProductionCompanyGroupByOutputType = {
    id: number
    name: string
    _count: ProductionCompanyCountAggregateOutputType | null
    _avg: ProductionCompanyAvgAggregateOutputType | null
    _sum: ProductionCompanySumAggregateOutputType | null
    _min: ProductionCompanyMinAggregateOutputType | null
    _max: ProductionCompanyMaxAggregateOutputType | null
  }

  type GetProductionCompanyGroupByPayload<T extends ProductionCompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductionCompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductionCompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductionCompanyGroupByOutputType[P]>
            : GetScalarType<T[P], ProductionCompanyGroupByOutputType[P]>
        }
      >
    >


  export type ProductionCompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    movies?: boolean | ProductionCompany$moviesArgs<ExtArgs>
    _count?: boolean | ProductionCompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productionCompany"]>

  export type ProductionCompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["productionCompany"]>

  export type ProductionCompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["productionCompany"]>

  export type ProductionCompanySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type ProductionCompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["productionCompany"]>
  export type ProductionCompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | ProductionCompany$moviesArgs<ExtArgs>
    _count?: boolean | ProductionCompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductionCompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductionCompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductionCompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductionCompany"
    objects: {
      movies: Prisma.$MoviePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["productionCompany"]>
    composites: {}
  }

  type ProductionCompanyGetPayload<S extends boolean | null | undefined | ProductionCompanyDefaultArgs> = $Result.GetResult<Prisma.$ProductionCompanyPayload, S>

  type ProductionCompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductionCompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductionCompanyCountAggregateInputType | true
    }

  export interface ProductionCompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductionCompany'], meta: { name: 'ProductionCompany' } }
    /**
     * Find zero or one ProductionCompany that matches the filter.
     * @param {ProductionCompanyFindUniqueArgs} args - Arguments to find a ProductionCompany
     * @example
     * // Get one ProductionCompany
     * const productionCompany = await prisma.productionCompany.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductionCompanyFindUniqueArgs>(args: SelectSubset<T, ProductionCompanyFindUniqueArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductionCompany that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductionCompanyFindUniqueOrThrowArgs} args - Arguments to find a ProductionCompany
     * @example
     * // Get one ProductionCompany
     * const productionCompany = await prisma.productionCompany.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductionCompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductionCompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductionCompany that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyFindFirstArgs} args - Arguments to find a ProductionCompany
     * @example
     * // Get one ProductionCompany
     * const productionCompany = await prisma.productionCompany.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductionCompanyFindFirstArgs>(args?: SelectSubset<T, ProductionCompanyFindFirstArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductionCompany that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyFindFirstOrThrowArgs} args - Arguments to find a ProductionCompany
     * @example
     * // Get one ProductionCompany
     * const productionCompany = await prisma.productionCompany.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductionCompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductionCompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductionCompanies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductionCompanies
     * const productionCompanies = await prisma.productionCompany.findMany()
     * 
     * // Get first 10 ProductionCompanies
     * const productionCompanies = await prisma.productionCompany.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productionCompanyWithIdOnly = await prisma.productionCompany.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductionCompanyFindManyArgs>(args?: SelectSubset<T, ProductionCompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductionCompany.
     * @param {ProductionCompanyCreateArgs} args - Arguments to create a ProductionCompany.
     * @example
     * // Create one ProductionCompany
     * const ProductionCompany = await prisma.productionCompany.create({
     *   data: {
     *     // ... data to create a ProductionCompany
     *   }
     * })
     * 
     */
    create<T extends ProductionCompanyCreateArgs>(args: SelectSubset<T, ProductionCompanyCreateArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductionCompanies.
     * @param {ProductionCompanyCreateManyArgs} args - Arguments to create many ProductionCompanies.
     * @example
     * // Create many ProductionCompanies
     * const productionCompany = await prisma.productionCompany.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductionCompanyCreateManyArgs>(args?: SelectSubset<T, ProductionCompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductionCompanies and returns the data saved in the database.
     * @param {ProductionCompanyCreateManyAndReturnArgs} args - Arguments to create many ProductionCompanies.
     * @example
     * // Create many ProductionCompanies
     * const productionCompany = await prisma.productionCompany.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductionCompanies and only return the `id`
     * const productionCompanyWithIdOnly = await prisma.productionCompany.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductionCompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductionCompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductionCompany.
     * @param {ProductionCompanyDeleteArgs} args - Arguments to delete one ProductionCompany.
     * @example
     * // Delete one ProductionCompany
     * const ProductionCompany = await prisma.productionCompany.delete({
     *   where: {
     *     // ... filter to delete one ProductionCompany
     *   }
     * })
     * 
     */
    delete<T extends ProductionCompanyDeleteArgs>(args: SelectSubset<T, ProductionCompanyDeleteArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductionCompany.
     * @param {ProductionCompanyUpdateArgs} args - Arguments to update one ProductionCompany.
     * @example
     * // Update one ProductionCompany
     * const productionCompany = await prisma.productionCompany.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductionCompanyUpdateArgs>(args: SelectSubset<T, ProductionCompanyUpdateArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductionCompanies.
     * @param {ProductionCompanyDeleteManyArgs} args - Arguments to filter ProductionCompanies to delete.
     * @example
     * // Delete a few ProductionCompanies
     * const { count } = await prisma.productionCompany.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductionCompanyDeleteManyArgs>(args?: SelectSubset<T, ProductionCompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductionCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductionCompanies
     * const productionCompany = await prisma.productionCompany.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductionCompanyUpdateManyArgs>(args: SelectSubset<T, ProductionCompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductionCompanies and returns the data updated in the database.
     * @param {ProductionCompanyUpdateManyAndReturnArgs} args - Arguments to update many ProductionCompanies.
     * @example
     * // Update many ProductionCompanies
     * const productionCompany = await prisma.productionCompany.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductionCompanies and only return the `id`
     * const productionCompanyWithIdOnly = await prisma.productionCompany.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductionCompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductionCompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductionCompany.
     * @param {ProductionCompanyUpsertArgs} args - Arguments to update or create a ProductionCompany.
     * @example
     * // Update or create a ProductionCompany
     * const productionCompany = await prisma.productionCompany.upsert({
     *   create: {
     *     // ... data to create a ProductionCompany
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductionCompany we want to update
     *   }
     * })
     */
    upsert<T extends ProductionCompanyUpsertArgs>(args: SelectSubset<T, ProductionCompanyUpsertArgs<ExtArgs>>): Prisma__ProductionCompanyClient<$Result.GetResult<Prisma.$ProductionCompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductionCompanies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyCountArgs} args - Arguments to filter ProductionCompanies to count.
     * @example
     * // Count the number of ProductionCompanies
     * const count = await prisma.productionCompany.count({
     *   where: {
     *     // ... the filter for the ProductionCompanies we want to count
     *   }
     * })
    **/
    count<T extends ProductionCompanyCountArgs>(
      args?: Subset<T, ProductionCompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductionCompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductionCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductionCompanyAggregateArgs>(args: Subset<T, ProductionCompanyAggregateArgs>): Prisma.PrismaPromise<GetProductionCompanyAggregateType<T>>

    /**
     * Group by ProductionCompany.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionCompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductionCompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductionCompanyGroupByArgs['orderBy'] }
        : { orderBy?: ProductionCompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductionCompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductionCompany model
   */
  readonly fields: ProductionCompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductionCompany.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductionCompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movies<T extends ProductionCompany$moviesArgs<ExtArgs> = {}>(args?: Subset<T, ProductionCompany$moviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductionCompany model
   */
  interface ProductionCompanyFieldRefs {
    readonly id: FieldRef<"ProductionCompany", 'Int'>
    readonly name: FieldRef<"ProductionCompany", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductionCompany findUnique
   */
  export type ProductionCompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionCompany to fetch.
     */
    where: ProductionCompanyWhereUniqueInput
  }

  /**
   * ProductionCompany findUniqueOrThrow
   */
  export type ProductionCompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionCompany to fetch.
     */
    where: ProductionCompanyWhereUniqueInput
  }

  /**
   * ProductionCompany findFirst
   */
  export type ProductionCompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionCompany to fetch.
     */
    where?: ProductionCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionCompanies to fetch.
     */
    orderBy?: ProductionCompanyOrderByWithRelationInput | ProductionCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductionCompanies.
     */
    cursor?: ProductionCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionCompanies.
     */
    distinct?: ProductionCompanyScalarFieldEnum | ProductionCompanyScalarFieldEnum[]
  }

  /**
   * ProductionCompany findFirstOrThrow
   */
  export type ProductionCompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionCompany to fetch.
     */
    where?: ProductionCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionCompanies to fetch.
     */
    orderBy?: ProductionCompanyOrderByWithRelationInput | ProductionCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductionCompanies.
     */
    cursor?: ProductionCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionCompanies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionCompanies.
     */
    distinct?: ProductionCompanyScalarFieldEnum | ProductionCompanyScalarFieldEnum[]
  }

  /**
   * ProductionCompany findMany
   */
  export type ProductionCompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionCompanies to fetch.
     */
    where?: ProductionCompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionCompanies to fetch.
     */
    orderBy?: ProductionCompanyOrderByWithRelationInput | ProductionCompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductionCompanies.
     */
    cursor?: ProductionCompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionCompanies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionCompanies.
     */
    skip?: number
    distinct?: ProductionCompanyScalarFieldEnum | ProductionCompanyScalarFieldEnum[]
  }

  /**
   * ProductionCompany create
   */
  export type ProductionCompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductionCompany.
     */
    data: XOR<ProductionCompanyCreateInput, ProductionCompanyUncheckedCreateInput>
  }

  /**
   * ProductionCompany createMany
   */
  export type ProductionCompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductionCompanies.
     */
    data: ProductionCompanyCreateManyInput | ProductionCompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductionCompany createManyAndReturn
   */
  export type ProductionCompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * The data used to create many ProductionCompanies.
     */
    data: ProductionCompanyCreateManyInput | ProductionCompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductionCompany update
   */
  export type ProductionCompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductionCompany.
     */
    data: XOR<ProductionCompanyUpdateInput, ProductionCompanyUncheckedUpdateInput>
    /**
     * Choose, which ProductionCompany to update.
     */
    where: ProductionCompanyWhereUniqueInput
  }

  /**
   * ProductionCompany updateMany
   */
  export type ProductionCompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductionCompanies.
     */
    data: XOR<ProductionCompanyUpdateManyMutationInput, ProductionCompanyUncheckedUpdateManyInput>
    /**
     * Filter which ProductionCompanies to update
     */
    where?: ProductionCompanyWhereInput
    /**
     * Limit how many ProductionCompanies to update.
     */
    limit?: number
  }

  /**
   * ProductionCompany updateManyAndReturn
   */
  export type ProductionCompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * The data used to update ProductionCompanies.
     */
    data: XOR<ProductionCompanyUpdateManyMutationInput, ProductionCompanyUncheckedUpdateManyInput>
    /**
     * Filter which ProductionCompanies to update
     */
    where?: ProductionCompanyWhereInput
    /**
     * Limit how many ProductionCompanies to update.
     */
    limit?: number
  }

  /**
   * ProductionCompany upsert
   */
  export type ProductionCompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductionCompany to update in case it exists.
     */
    where: ProductionCompanyWhereUniqueInput
    /**
     * In case the ProductionCompany found by the `where` argument doesn't exist, create a new ProductionCompany with this data.
     */
    create: XOR<ProductionCompanyCreateInput, ProductionCompanyUncheckedCreateInput>
    /**
     * In case the ProductionCompany was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductionCompanyUpdateInput, ProductionCompanyUncheckedUpdateInput>
  }

  /**
   * ProductionCompany delete
   */
  export type ProductionCompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
    /**
     * Filter which ProductionCompany to delete.
     */
    where: ProductionCompanyWhereUniqueInput
  }

  /**
   * ProductionCompany deleteMany
   */
  export type ProductionCompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionCompanies to delete
     */
    where?: ProductionCompanyWhereInput
    /**
     * Limit how many ProductionCompanies to delete.
     */
    limit?: number
  }

  /**
   * ProductionCompany.movies
   */
  export type ProductionCompany$moviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * ProductionCompany without action
   */
  export type ProductionCompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionCompany
     */
    select?: ProductionCompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionCompany
     */
    omit?: ProductionCompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionCompanyInclude<ExtArgs> | null
  }


  /**
   * Model TVShow
   */

  export type AggregateTVShow = {
    _count: TVShowCountAggregateOutputType | null
    _avg: TVShowAvgAggregateOutputType | null
    _sum: TVShowSumAggregateOutputType | null
    _min: TVShowMinAggregateOutputType | null
    _max: TVShowMaxAggregateOutputType | null
  }

  export type TVShowAvgAggregateOutputType = {
    id: number | null
    endYear: number | null
  }

  export type TVShowSumAggregateOutputType = {
    id: number | null
    endYear: number | null
  }

  export type TVShowMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    endYear: number | null
    poster: string | null
    first_air_date: Date | null
  }

  export type TVShowMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    endYear: number | null
    poster: string | null
    first_air_date: Date | null
  }

  export type TVShowCountAggregateOutputType = {
    id: number
    title: number
    description: number
    endYear: number
    poster: number
    first_air_date: number
    _all: number
  }


  export type TVShowAvgAggregateInputType = {
    id?: true
    endYear?: true
  }

  export type TVShowSumAggregateInputType = {
    id?: true
    endYear?: true
  }

  export type TVShowMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    endYear?: true
    poster?: true
    first_air_date?: true
  }

  export type TVShowMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    endYear?: true
    poster?: true
    first_air_date?: true
  }

  export type TVShowCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    endYear?: true
    poster?: true
    first_air_date?: true
    _all?: true
  }

  export type TVShowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TVShow to aggregate.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TVShows
    **/
    _count?: true | TVShowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TVShowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TVShowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TVShowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TVShowMaxAggregateInputType
  }

  export type GetTVShowAggregateType<T extends TVShowAggregateArgs> = {
        [P in keyof T & keyof AggregateTVShow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTVShow[P]>
      : GetScalarType<T[P], AggregateTVShow[P]>
  }




  export type TVShowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TVShowWhereInput
    orderBy?: TVShowOrderByWithAggregationInput | TVShowOrderByWithAggregationInput[]
    by: TVShowScalarFieldEnum[] | TVShowScalarFieldEnum
    having?: TVShowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TVShowCountAggregateInputType | true
    _avg?: TVShowAvgAggregateInputType
    _sum?: TVShowSumAggregateInputType
    _min?: TVShowMinAggregateInputType
    _max?: TVShowMaxAggregateInputType
  }

  export type TVShowGroupByOutputType = {
    id: number
    title: string
    description: string | null
    endYear: number | null
    poster: string | null
    first_air_date: Date | null
    _count: TVShowCountAggregateOutputType | null
    _avg: TVShowAvgAggregateOutputType | null
    _sum: TVShowSumAggregateOutputType | null
    _min: TVShowMinAggregateOutputType | null
    _max: TVShowMaxAggregateOutputType | null
  }

  type GetTVShowGroupByPayload<T extends TVShowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TVShowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TVShowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TVShowGroupByOutputType[P]>
            : GetScalarType<T[P], TVShowGroupByOutputType[P]>
        }
      >
    >


  export type TVShowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    endYear?: boolean
    poster?: boolean
    first_air_date?: boolean
    reviews?: boolean | TVShow$reviewsArgs<ExtArgs>
    watched?: boolean | TVShow$watchedArgs<ExtArgs>
    watchlists?: boolean | TVShow$watchlistsArgs<ExtArgs>
    lists?: boolean | TVShow$listsArgs<ExtArgs>
    _count?: boolean | TVShowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tVShow"]>

  export type TVShowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    endYear?: boolean
    poster?: boolean
    first_air_date?: boolean
  }, ExtArgs["result"]["tVShow"]>

  export type TVShowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    endYear?: boolean
    poster?: boolean
    first_air_date?: boolean
  }, ExtArgs["result"]["tVShow"]>

  export type TVShowSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    endYear?: boolean
    poster?: boolean
    first_air_date?: boolean
  }

  export type TVShowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "endYear" | "poster" | "first_air_date", ExtArgs["result"]["tVShow"]>
  export type TVShowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | TVShow$reviewsArgs<ExtArgs>
    watched?: boolean | TVShow$watchedArgs<ExtArgs>
    watchlists?: boolean | TVShow$watchlistsArgs<ExtArgs>
    lists?: boolean | TVShow$listsArgs<ExtArgs>
    _count?: boolean | TVShowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TVShowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TVShowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TVShowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TVShow"
    objects: {
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      watched: Prisma.$WatchedPayload<ExtArgs>[]
      watchlists: Prisma.$WatchlistPayload<ExtArgs>[]
      lists: Prisma.$ListPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      endYear: number | null
      poster: string | null
      first_air_date: Date | null
    }, ExtArgs["result"]["tVShow"]>
    composites: {}
  }

  type TVShowGetPayload<S extends boolean | null | undefined | TVShowDefaultArgs> = $Result.GetResult<Prisma.$TVShowPayload, S>

  type TVShowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TVShowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TVShowCountAggregateInputType | true
    }

  export interface TVShowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TVShow'], meta: { name: 'TVShow' } }
    /**
     * Find zero or one TVShow that matches the filter.
     * @param {TVShowFindUniqueArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TVShowFindUniqueArgs>(args: SelectSubset<T, TVShowFindUniqueArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TVShow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TVShowFindUniqueOrThrowArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TVShowFindUniqueOrThrowArgs>(args: SelectSubset<T, TVShowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TVShow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowFindFirstArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TVShowFindFirstArgs>(args?: SelectSubset<T, TVShowFindFirstArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TVShow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowFindFirstOrThrowArgs} args - Arguments to find a TVShow
     * @example
     * // Get one TVShow
     * const tVShow = await prisma.tVShow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TVShowFindFirstOrThrowArgs>(args?: SelectSubset<T, TVShowFindFirstOrThrowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TVShows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TVShows
     * const tVShows = await prisma.tVShow.findMany()
     * 
     * // Get first 10 TVShows
     * const tVShows = await prisma.tVShow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tVShowWithIdOnly = await prisma.tVShow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TVShowFindManyArgs>(args?: SelectSubset<T, TVShowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TVShow.
     * @param {TVShowCreateArgs} args - Arguments to create a TVShow.
     * @example
     * // Create one TVShow
     * const TVShow = await prisma.tVShow.create({
     *   data: {
     *     // ... data to create a TVShow
     *   }
     * })
     * 
     */
    create<T extends TVShowCreateArgs>(args: SelectSubset<T, TVShowCreateArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TVShows.
     * @param {TVShowCreateManyArgs} args - Arguments to create many TVShows.
     * @example
     * // Create many TVShows
     * const tVShow = await prisma.tVShow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TVShowCreateManyArgs>(args?: SelectSubset<T, TVShowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TVShows and returns the data saved in the database.
     * @param {TVShowCreateManyAndReturnArgs} args - Arguments to create many TVShows.
     * @example
     * // Create many TVShows
     * const tVShow = await prisma.tVShow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TVShows and only return the `id`
     * const tVShowWithIdOnly = await prisma.tVShow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TVShowCreateManyAndReturnArgs>(args?: SelectSubset<T, TVShowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TVShow.
     * @param {TVShowDeleteArgs} args - Arguments to delete one TVShow.
     * @example
     * // Delete one TVShow
     * const TVShow = await prisma.tVShow.delete({
     *   where: {
     *     // ... filter to delete one TVShow
     *   }
     * })
     * 
     */
    delete<T extends TVShowDeleteArgs>(args: SelectSubset<T, TVShowDeleteArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TVShow.
     * @param {TVShowUpdateArgs} args - Arguments to update one TVShow.
     * @example
     * // Update one TVShow
     * const tVShow = await prisma.tVShow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TVShowUpdateArgs>(args: SelectSubset<T, TVShowUpdateArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TVShows.
     * @param {TVShowDeleteManyArgs} args - Arguments to filter TVShows to delete.
     * @example
     * // Delete a few TVShows
     * const { count } = await prisma.tVShow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TVShowDeleteManyArgs>(args?: SelectSubset<T, TVShowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TVShows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TVShows
     * const tVShow = await prisma.tVShow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TVShowUpdateManyArgs>(args: SelectSubset<T, TVShowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TVShows and returns the data updated in the database.
     * @param {TVShowUpdateManyAndReturnArgs} args - Arguments to update many TVShows.
     * @example
     * // Update many TVShows
     * const tVShow = await prisma.tVShow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TVShows and only return the `id`
     * const tVShowWithIdOnly = await prisma.tVShow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TVShowUpdateManyAndReturnArgs>(args: SelectSubset<T, TVShowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TVShow.
     * @param {TVShowUpsertArgs} args - Arguments to update or create a TVShow.
     * @example
     * // Update or create a TVShow
     * const tVShow = await prisma.tVShow.upsert({
     *   create: {
     *     // ... data to create a TVShow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TVShow we want to update
     *   }
     * })
     */
    upsert<T extends TVShowUpsertArgs>(args: SelectSubset<T, TVShowUpsertArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TVShows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowCountArgs} args - Arguments to filter TVShows to count.
     * @example
     * // Count the number of TVShows
     * const count = await prisma.tVShow.count({
     *   where: {
     *     // ... the filter for the TVShows we want to count
     *   }
     * })
    **/
    count<T extends TVShowCountArgs>(
      args?: Subset<T, TVShowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TVShowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TVShow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TVShowAggregateArgs>(args: Subset<T, TVShowAggregateArgs>): Prisma.PrismaPromise<GetTVShowAggregateType<T>>

    /**
     * Group by TVShow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TVShowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TVShowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TVShowGroupByArgs['orderBy'] }
        : { orderBy?: TVShowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TVShowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTVShowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TVShow model
   */
  readonly fields: TVShowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TVShow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TVShowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reviews<T extends TVShow$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, TVShow$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watched<T extends TVShow$watchedArgs<ExtArgs> = {}>(args?: Subset<T, TVShow$watchedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchlists<T extends TVShow$watchlistsArgs<ExtArgs> = {}>(args?: Subset<T, TVShow$watchlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lists<T extends TVShow$listsArgs<ExtArgs> = {}>(args?: Subset<T, TVShow$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TVShow model
   */
  interface TVShowFieldRefs {
    readonly id: FieldRef<"TVShow", 'Int'>
    readonly title: FieldRef<"TVShow", 'String'>
    readonly description: FieldRef<"TVShow", 'String'>
    readonly endYear: FieldRef<"TVShow", 'Int'>
    readonly poster: FieldRef<"TVShow", 'String'>
    readonly first_air_date: FieldRef<"TVShow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TVShow findUnique
   */
  export type TVShowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow findUniqueOrThrow
   */
  export type TVShowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow findFirst
   */
  export type TVShowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TVShows.
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TVShows.
     */
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * TVShow findFirstOrThrow
   */
  export type TVShowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShow to fetch.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TVShows.
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TVShows.
     */
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * TVShow findMany
   */
  export type TVShowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter, which TVShows to fetch.
     */
    where?: TVShowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TVShows to fetch.
     */
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TVShows.
     */
    cursor?: TVShowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TVShows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TVShows.
     */
    skip?: number
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * TVShow create
   */
  export type TVShowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * The data needed to create a TVShow.
     */
    data: XOR<TVShowCreateInput, TVShowUncheckedCreateInput>
  }

  /**
   * TVShow createMany
   */
  export type TVShowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TVShows.
     */
    data: TVShowCreateManyInput | TVShowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TVShow createManyAndReturn
   */
  export type TVShowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * The data used to create many TVShows.
     */
    data: TVShowCreateManyInput | TVShowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TVShow update
   */
  export type TVShowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * The data needed to update a TVShow.
     */
    data: XOR<TVShowUpdateInput, TVShowUncheckedUpdateInput>
    /**
     * Choose, which TVShow to update.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow updateMany
   */
  export type TVShowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TVShows.
     */
    data: XOR<TVShowUpdateManyMutationInput, TVShowUncheckedUpdateManyInput>
    /**
     * Filter which TVShows to update
     */
    where?: TVShowWhereInput
    /**
     * Limit how many TVShows to update.
     */
    limit?: number
  }

  /**
   * TVShow updateManyAndReturn
   */
  export type TVShowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * The data used to update TVShows.
     */
    data: XOR<TVShowUpdateManyMutationInput, TVShowUncheckedUpdateManyInput>
    /**
     * Filter which TVShows to update
     */
    where?: TVShowWhereInput
    /**
     * Limit how many TVShows to update.
     */
    limit?: number
  }

  /**
   * TVShow upsert
   */
  export type TVShowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * The filter to search for the TVShow to update in case it exists.
     */
    where: TVShowWhereUniqueInput
    /**
     * In case the TVShow found by the `where` argument doesn't exist, create a new TVShow with this data.
     */
    create: XOR<TVShowCreateInput, TVShowUncheckedCreateInput>
    /**
     * In case the TVShow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TVShowUpdateInput, TVShowUncheckedUpdateInput>
  }

  /**
   * TVShow delete
   */
  export type TVShowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    /**
     * Filter which TVShow to delete.
     */
    where: TVShowWhereUniqueInput
  }

  /**
   * TVShow deleteMany
   */
  export type TVShowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TVShows to delete
     */
    where?: TVShowWhereInput
    /**
     * Limit how many TVShows to delete.
     */
    limit?: number
  }

  /**
   * TVShow.reviews
   */
  export type TVShow$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * TVShow.watched
   */
  export type TVShow$watchedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    where?: WatchedWhereInput
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    cursor?: WatchedWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchedScalarFieldEnum | WatchedScalarFieldEnum[]
  }

  /**
   * TVShow.watchlists
   */
  export type TVShow$watchlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    cursor?: WatchlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * TVShow.lists
   */
  export type TVShow$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * TVShow without action
   */
  export type TVShowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
    movieId: number | null
    TVId: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
    movieId: number | null
    TVId: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    userId: string | null
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    userId: string | null
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    userId: number
    movieId: number
    TVId: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
    movieId?: true
    TVId?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
    movieId?: true
    TVId?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    rating: number
    comment: string | null
    userId: string
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType
    createdAt: Date
    updatedAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Review$TVShowArgs<ExtArgs>
    movie?: boolean | Review$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Review$TVShowArgs<ExtArgs>
    movie?: boolean | Review$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Review$TVShowArgs<ExtArgs>
    movie?: boolean | Review$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rating" | "comment" | "userId" | "movieId" | "TVId" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Review$TVShowArgs<ExtArgs>
    movie?: boolean | Review$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Review$TVShowArgs<ExtArgs>
    movie?: boolean | Review$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Review$TVShowArgs<ExtArgs>
    movie?: boolean | Review$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      TVShow: Prisma.$TVShowPayload<ExtArgs> | null
      movie: Prisma.$MoviePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rating: number
      comment: string | null
      userId: string
      movieId: number | null
      TVId: number | null
      type: $Enums.ShowType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    TVShow<T extends Review$TVShowArgs<ExtArgs> = {}>(args?: Subset<T, Review$TVShowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movie<T extends Review$movieArgs<ExtArgs> = {}>(args?: Subset<T, Review$movieArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Float'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly userId: FieldRef<"Review", 'String'>
    readonly movieId: FieldRef<"Review", 'Int'>
    readonly TVId: FieldRef<"Review", 'Int'>
    readonly type: FieldRef<"Review", 'ShowType'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review.TVShow
   */
  export type Review$TVShowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    where?: TVShowWhereInput
  }

  /**
   * Review.movie
   */
  export type Review$movieArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model Watched
   */

  export type AggregateWatched = {
    _count: WatchedCountAggregateOutputType | null
    _avg: WatchedAvgAggregateOutputType | null
    _sum: WatchedSumAggregateOutputType | null
    _min: WatchedMinAggregateOutputType | null
    _max: WatchedMaxAggregateOutputType | null
  }

  export type WatchedAvgAggregateOutputType = {
    movieId: number | null
    TVId: number | null
  }

  export type WatchedSumAggregateOutputType = {
    movieId: number | null
    TVId: number | null
  }

  export type WatchedMinAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchedMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchedCountAggregateOutputType = {
    id: number
    userId: number
    movieId: number
    TVId: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WatchedAvgAggregateInputType = {
    movieId?: true
    TVId?: true
  }

  export type WatchedSumAggregateInputType = {
    movieId?: true
    TVId?: true
  }

  export type WatchedMinAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchedMaxAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchedCountAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WatchedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watched to aggregate.
     */
    where?: WatchedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watcheds to fetch.
     */
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watcheds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watcheds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Watcheds
    **/
    _count?: true | WatchedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchedMaxAggregateInputType
  }

  export type GetWatchedAggregateType<T extends WatchedAggregateArgs> = {
        [P in keyof T & keyof AggregateWatched]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatched[P]>
      : GetScalarType<T[P], AggregateWatched[P]>
  }




  export type WatchedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchedWhereInput
    orderBy?: WatchedOrderByWithAggregationInput | WatchedOrderByWithAggregationInput[]
    by: WatchedScalarFieldEnum[] | WatchedScalarFieldEnum
    having?: WatchedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchedCountAggregateInputType | true
    _avg?: WatchedAvgAggregateInputType
    _sum?: WatchedSumAggregateInputType
    _min?: WatchedMinAggregateInputType
    _max?: WatchedMaxAggregateInputType
  }

  export type WatchedGroupByOutputType = {
    id: string
    userId: string
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType
    createdAt: Date
    updatedAt: Date
    _count: WatchedCountAggregateOutputType | null
    _avg: WatchedAvgAggregateOutputType | null
    _sum: WatchedSumAggregateOutputType | null
    _min: WatchedMinAggregateOutputType | null
    _max: WatchedMaxAggregateOutputType | null
  }

  type GetWatchedGroupByPayload<T extends WatchedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchedGroupByOutputType[P]>
            : GetScalarType<T[P], WatchedGroupByOutputType[P]>
        }
      >
    >


  export type WatchedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Watched$TVShowArgs<ExtArgs>
    movie?: boolean | Watched$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watched"]>

  export type WatchedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Watched$TVShowArgs<ExtArgs>
    movie?: boolean | Watched$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watched"]>

  export type WatchedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Watched$TVShowArgs<ExtArgs>
    movie?: boolean | Watched$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watched"]>

  export type WatchedSelectScalar = {
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WatchedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "movieId" | "TVId" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["watched"]>
  export type WatchedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Watched$TVShowArgs<ExtArgs>
    movie?: boolean | Watched$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WatchedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Watched$TVShowArgs<ExtArgs>
    movie?: boolean | Watched$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WatchedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Watched$TVShowArgs<ExtArgs>
    movie?: boolean | Watched$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WatchedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Watched"
    objects: {
      TVShow: Prisma.$TVShowPayload<ExtArgs> | null
      movie: Prisma.$MoviePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      movieId: number | null
      TVId: number | null
      type: $Enums.ShowType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["watched"]>
    composites: {}
  }

  type WatchedGetPayload<S extends boolean | null | undefined | WatchedDefaultArgs> = $Result.GetResult<Prisma.$WatchedPayload, S>

  type WatchedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchedCountAggregateInputType | true
    }

  export interface WatchedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Watched'], meta: { name: 'Watched' } }
    /**
     * Find zero or one Watched that matches the filter.
     * @param {WatchedFindUniqueArgs} args - Arguments to find a Watched
     * @example
     * // Get one Watched
     * const watched = await prisma.watched.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchedFindUniqueArgs>(args: SelectSubset<T, WatchedFindUniqueArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Watched that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchedFindUniqueOrThrowArgs} args - Arguments to find a Watched
     * @example
     * // Get one Watched
     * const watched = await prisma.watched.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchedFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watched that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedFindFirstArgs} args - Arguments to find a Watched
     * @example
     * // Get one Watched
     * const watched = await prisma.watched.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchedFindFirstArgs>(args?: SelectSubset<T, WatchedFindFirstArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watched that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedFindFirstOrThrowArgs} args - Arguments to find a Watched
     * @example
     * // Get one Watched
     * const watched = await prisma.watched.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchedFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchedFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Watcheds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watcheds
     * const watcheds = await prisma.watched.findMany()
     * 
     * // Get first 10 Watcheds
     * const watcheds = await prisma.watched.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchedWithIdOnly = await prisma.watched.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchedFindManyArgs>(args?: SelectSubset<T, WatchedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Watched.
     * @param {WatchedCreateArgs} args - Arguments to create a Watched.
     * @example
     * // Create one Watched
     * const Watched = await prisma.watched.create({
     *   data: {
     *     // ... data to create a Watched
     *   }
     * })
     * 
     */
    create<T extends WatchedCreateArgs>(args: SelectSubset<T, WatchedCreateArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Watcheds.
     * @param {WatchedCreateManyArgs} args - Arguments to create many Watcheds.
     * @example
     * // Create many Watcheds
     * const watched = await prisma.watched.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchedCreateManyArgs>(args?: SelectSubset<T, WatchedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Watcheds and returns the data saved in the database.
     * @param {WatchedCreateManyAndReturnArgs} args - Arguments to create many Watcheds.
     * @example
     * // Create many Watcheds
     * const watched = await prisma.watched.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Watcheds and only return the `id`
     * const watchedWithIdOnly = await prisma.watched.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchedCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Watched.
     * @param {WatchedDeleteArgs} args - Arguments to delete one Watched.
     * @example
     * // Delete one Watched
     * const Watched = await prisma.watched.delete({
     *   where: {
     *     // ... filter to delete one Watched
     *   }
     * })
     * 
     */
    delete<T extends WatchedDeleteArgs>(args: SelectSubset<T, WatchedDeleteArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Watched.
     * @param {WatchedUpdateArgs} args - Arguments to update one Watched.
     * @example
     * // Update one Watched
     * const watched = await prisma.watched.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchedUpdateArgs>(args: SelectSubset<T, WatchedUpdateArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Watcheds.
     * @param {WatchedDeleteManyArgs} args - Arguments to filter Watcheds to delete.
     * @example
     * // Delete a few Watcheds
     * const { count } = await prisma.watched.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchedDeleteManyArgs>(args?: SelectSubset<T, WatchedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watcheds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watcheds
     * const watched = await prisma.watched.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchedUpdateManyArgs>(args: SelectSubset<T, WatchedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watcheds and returns the data updated in the database.
     * @param {WatchedUpdateManyAndReturnArgs} args - Arguments to update many Watcheds.
     * @example
     * // Update many Watcheds
     * const watched = await prisma.watched.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Watcheds and only return the `id`
     * const watchedWithIdOnly = await prisma.watched.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchedUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Watched.
     * @param {WatchedUpsertArgs} args - Arguments to update or create a Watched.
     * @example
     * // Update or create a Watched
     * const watched = await prisma.watched.upsert({
     *   create: {
     *     // ... data to create a Watched
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watched we want to update
     *   }
     * })
     */
    upsert<T extends WatchedUpsertArgs>(args: SelectSubset<T, WatchedUpsertArgs<ExtArgs>>): Prisma__WatchedClient<$Result.GetResult<Prisma.$WatchedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Watcheds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedCountArgs} args - Arguments to filter Watcheds to count.
     * @example
     * // Count the number of Watcheds
     * const count = await prisma.watched.count({
     *   where: {
     *     // ... the filter for the Watcheds we want to count
     *   }
     * })
    **/
    count<T extends WatchedCountArgs>(
      args?: Subset<T, WatchedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Watched.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchedAggregateArgs>(args: Subset<T, WatchedAggregateArgs>): Prisma.PrismaPromise<GetWatchedAggregateType<T>>

    /**
     * Group by Watched.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchedGroupByArgs['orderBy'] }
        : { orderBy?: WatchedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Watched model
   */
  readonly fields: WatchedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Watched.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    TVShow<T extends Watched$TVShowArgs<ExtArgs> = {}>(args?: Subset<T, Watched$TVShowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movie<T extends Watched$movieArgs<ExtArgs> = {}>(args?: Subset<T, Watched$movieArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Watched model
   */
  interface WatchedFieldRefs {
    readonly id: FieldRef<"Watched", 'String'>
    readonly userId: FieldRef<"Watched", 'String'>
    readonly movieId: FieldRef<"Watched", 'Int'>
    readonly TVId: FieldRef<"Watched", 'Int'>
    readonly type: FieldRef<"Watched", 'ShowType'>
    readonly createdAt: FieldRef<"Watched", 'DateTime'>
    readonly updatedAt: FieldRef<"Watched", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Watched findUnique
   */
  export type WatchedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * Filter, which Watched to fetch.
     */
    where: WatchedWhereUniqueInput
  }

  /**
   * Watched findUniqueOrThrow
   */
  export type WatchedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * Filter, which Watched to fetch.
     */
    where: WatchedWhereUniqueInput
  }

  /**
   * Watched findFirst
   */
  export type WatchedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * Filter, which Watched to fetch.
     */
    where?: WatchedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watcheds to fetch.
     */
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watcheds.
     */
    cursor?: WatchedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watcheds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watcheds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watcheds.
     */
    distinct?: WatchedScalarFieldEnum | WatchedScalarFieldEnum[]
  }

  /**
   * Watched findFirstOrThrow
   */
  export type WatchedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * Filter, which Watched to fetch.
     */
    where?: WatchedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watcheds to fetch.
     */
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watcheds.
     */
    cursor?: WatchedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watcheds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watcheds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watcheds.
     */
    distinct?: WatchedScalarFieldEnum | WatchedScalarFieldEnum[]
  }

  /**
   * Watched findMany
   */
  export type WatchedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * Filter, which Watcheds to fetch.
     */
    where?: WatchedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watcheds to fetch.
     */
    orderBy?: WatchedOrderByWithRelationInput | WatchedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Watcheds.
     */
    cursor?: WatchedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watcheds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watcheds.
     */
    skip?: number
    distinct?: WatchedScalarFieldEnum | WatchedScalarFieldEnum[]
  }

  /**
   * Watched create
   */
  export type WatchedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * The data needed to create a Watched.
     */
    data: XOR<WatchedCreateInput, WatchedUncheckedCreateInput>
  }

  /**
   * Watched createMany
   */
  export type WatchedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Watcheds.
     */
    data: WatchedCreateManyInput | WatchedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Watched createManyAndReturn
   */
  export type WatchedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * The data used to create many Watcheds.
     */
    data: WatchedCreateManyInput | WatchedCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watched update
   */
  export type WatchedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * The data needed to update a Watched.
     */
    data: XOR<WatchedUpdateInput, WatchedUncheckedUpdateInput>
    /**
     * Choose, which Watched to update.
     */
    where: WatchedWhereUniqueInput
  }

  /**
   * Watched updateMany
   */
  export type WatchedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Watcheds.
     */
    data: XOR<WatchedUpdateManyMutationInput, WatchedUncheckedUpdateManyInput>
    /**
     * Filter which Watcheds to update
     */
    where?: WatchedWhereInput
    /**
     * Limit how many Watcheds to update.
     */
    limit?: number
  }

  /**
   * Watched updateManyAndReturn
   */
  export type WatchedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * The data used to update Watcheds.
     */
    data: XOR<WatchedUpdateManyMutationInput, WatchedUncheckedUpdateManyInput>
    /**
     * Filter which Watcheds to update
     */
    where?: WatchedWhereInput
    /**
     * Limit how many Watcheds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watched upsert
   */
  export type WatchedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * The filter to search for the Watched to update in case it exists.
     */
    where: WatchedWhereUniqueInput
    /**
     * In case the Watched found by the `where` argument doesn't exist, create a new Watched with this data.
     */
    create: XOR<WatchedCreateInput, WatchedUncheckedCreateInput>
    /**
     * In case the Watched was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchedUpdateInput, WatchedUncheckedUpdateInput>
  }

  /**
   * Watched delete
   */
  export type WatchedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
    /**
     * Filter which Watched to delete.
     */
    where: WatchedWhereUniqueInput
  }

  /**
   * Watched deleteMany
   */
  export type WatchedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watcheds to delete
     */
    where?: WatchedWhereInput
    /**
     * Limit how many Watcheds to delete.
     */
    limit?: number
  }

  /**
   * Watched.TVShow
   */
  export type Watched$TVShowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    where?: TVShowWhereInput
  }

  /**
   * Watched.movie
   */
  export type Watched$movieArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
  }

  /**
   * Watched without action
   */
  export type WatchedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watched
     */
    select?: WatchedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watched
     */
    omit?: WatchedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchedInclude<ExtArgs> | null
  }


  /**
   * Model Watchlist
   */

  export type AggregateWatchlist = {
    _count: WatchlistCountAggregateOutputType | null
    _avg: WatchlistAvgAggregateOutputType | null
    _sum: WatchlistSumAggregateOutputType | null
    _min: WatchlistMinAggregateOutputType | null
    _max: WatchlistMaxAggregateOutputType | null
  }

  export type WatchlistAvgAggregateOutputType = {
    movieId: number | null
    TVId: number | null
  }

  export type WatchlistSumAggregateOutputType = {
    movieId: number | null
    TVId: number | null
  }

  export type WatchlistMinAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchlistMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchlistCountAggregateOutputType = {
    id: number
    userId: number
    movieId: number
    TVId: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WatchlistAvgAggregateInputType = {
    movieId?: true
    TVId?: true
  }

  export type WatchlistSumAggregateInputType = {
    movieId?: true
    TVId?: true
  }

  export type WatchlistMinAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchlistMaxAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchlistCountAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    TVId?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WatchlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watchlist to aggregate.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Watchlists
    **/
    _count?: true | WatchlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchlistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchlistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchlistMaxAggregateInputType
  }

  export type GetWatchlistAggregateType<T extends WatchlistAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchlist[P]>
      : GetScalarType<T[P], AggregateWatchlist[P]>
  }




  export type WatchlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithAggregationInput | WatchlistOrderByWithAggregationInput[]
    by: WatchlistScalarFieldEnum[] | WatchlistScalarFieldEnum
    having?: WatchlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchlistCountAggregateInputType | true
    _avg?: WatchlistAvgAggregateInputType
    _sum?: WatchlistSumAggregateInputType
    _min?: WatchlistMinAggregateInputType
    _max?: WatchlistMaxAggregateInputType
  }

  export type WatchlistGroupByOutputType = {
    id: string
    userId: string
    movieId: number | null
    TVId: number | null
    type: $Enums.ShowType
    createdAt: Date
    updatedAt: Date
    _count: WatchlistCountAggregateOutputType | null
    _avg: WatchlistAvgAggregateOutputType | null
    _sum: WatchlistSumAggregateOutputType | null
    _min: WatchlistMinAggregateOutputType | null
    _max: WatchlistMaxAggregateOutputType | null
  }

  type GetWatchlistGroupByPayload<T extends WatchlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
            : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
        }
      >
    >


  export type WatchlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Watchlist$TVShowArgs<ExtArgs>
    movie?: boolean | Watchlist$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>

  export type WatchlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Watchlist$TVShowArgs<ExtArgs>
    movie?: boolean | Watchlist$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>

  export type WatchlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    TVShow?: boolean | Watchlist$TVShowArgs<ExtArgs>
    movie?: boolean | Watchlist$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>

  export type WatchlistSelectScalar = {
    id?: boolean
    userId?: boolean
    movieId?: boolean
    TVId?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WatchlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "movieId" | "TVId" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["watchlist"]>
  export type WatchlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Watchlist$TVShowArgs<ExtArgs>
    movie?: boolean | Watchlist$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WatchlistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Watchlist$TVShowArgs<ExtArgs>
    movie?: boolean | Watchlist$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WatchlistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    TVShow?: boolean | Watchlist$TVShowArgs<ExtArgs>
    movie?: boolean | Watchlist$movieArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WatchlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Watchlist"
    objects: {
      TVShow: Prisma.$TVShowPayload<ExtArgs> | null
      movie: Prisma.$MoviePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      movieId: number | null
      TVId: number | null
      type: $Enums.ShowType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["watchlist"]>
    composites: {}
  }

  type WatchlistGetPayload<S extends boolean | null | undefined | WatchlistDefaultArgs> = $Result.GetResult<Prisma.$WatchlistPayload, S>

  type WatchlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchlistCountAggregateInputType | true
    }

  export interface WatchlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Watchlist'], meta: { name: 'Watchlist' } }
    /**
     * Find zero or one Watchlist that matches the filter.
     * @param {WatchlistFindUniqueArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchlistFindUniqueArgs>(args: SelectSubset<T, WatchlistFindUniqueArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Watchlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchlistFindUniqueOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchlistFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watchlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchlistFindFirstArgs>(args?: SelectSubset<T, WatchlistFindFirstArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watchlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchlistFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Watchlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watchlists
     * const watchlists = await prisma.watchlist.findMany()
     * 
     * // Get first 10 Watchlists
     * const watchlists = await prisma.watchlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchlistFindManyArgs>(args?: SelectSubset<T, WatchlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Watchlist.
     * @param {WatchlistCreateArgs} args - Arguments to create a Watchlist.
     * @example
     * // Create one Watchlist
     * const Watchlist = await prisma.watchlist.create({
     *   data: {
     *     // ... data to create a Watchlist
     *   }
     * })
     * 
     */
    create<T extends WatchlistCreateArgs>(args: SelectSubset<T, WatchlistCreateArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Watchlists.
     * @param {WatchlistCreateManyArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchlistCreateManyArgs>(args?: SelectSubset<T, WatchlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Watchlists and returns the data saved in the database.
     * @param {WatchlistCreateManyAndReturnArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Watchlists and only return the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchlistCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Watchlist.
     * @param {WatchlistDeleteArgs} args - Arguments to delete one Watchlist.
     * @example
     * // Delete one Watchlist
     * const Watchlist = await prisma.watchlist.delete({
     *   where: {
     *     // ... filter to delete one Watchlist
     *   }
     * })
     * 
     */
    delete<T extends WatchlistDeleteArgs>(args: SelectSubset<T, WatchlistDeleteArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Watchlist.
     * @param {WatchlistUpdateArgs} args - Arguments to update one Watchlist.
     * @example
     * // Update one Watchlist
     * const watchlist = await prisma.watchlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchlistUpdateArgs>(args: SelectSubset<T, WatchlistUpdateArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Watchlists.
     * @param {WatchlistDeleteManyArgs} args - Arguments to filter Watchlists to delete.
     * @example
     * // Delete a few Watchlists
     * const { count } = await prisma.watchlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchlistDeleteManyArgs>(args?: SelectSubset<T, WatchlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchlistUpdateManyArgs>(args: SelectSubset<T, WatchlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watchlists and returns the data updated in the database.
     * @param {WatchlistUpdateManyAndReturnArgs} args - Arguments to update many Watchlists.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Watchlists and only return the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchlistUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Watchlist.
     * @param {WatchlistUpsertArgs} args - Arguments to update or create a Watchlist.
     * @example
     * // Update or create a Watchlist
     * const watchlist = await prisma.watchlist.upsert({
     *   create: {
     *     // ... data to create a Watchlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watchlist we want to update
     *   }
     * })
     */
    upsert<T extends WatchlistUpsertArgs>(args: SelectSubset<T, WatchlistUpsertArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistCountArgs} args - Arguments to filter Watchlists to count.
     * @example
     * // Count the number of Watchlists
     * const count = await prisma.watchlist.count({
     *   where: {
     *     // ... the filter for the Watchlists we want to count
     *   }
     * })
    **/
    count<T extends WatchlistCountArgs>(
      args?: Subset<T, WatchlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchlistAggregateArgs>(args: Subset<T, WatchlistAggregateArgs>): Prisma.PrismaPromise<GetWatchlistAggregateType<T>>

    /**
     * Group by Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchlistGroupByArgs['orderBy'] }
        : { orderBy?: WatchlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Watchlist model
   */
  readonly fields: WatchlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Watchlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    TVShow<T extends Watchlist$TVShowArgs<ExtArgs> = {}>(args?: Subset<T, Watchlist$TVShowArgs<ExtArgs>>): Prisma__TVShowClient<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movie<T extends Watchlist$movieArgs<ExtArgs> = {}>(args?: Subset<T, Watchlist$movieArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Watchlist model
   */
  interface WatchlistFieldRefs {
    readonly id: FieldRef<"Watchlist", 'String'>
    readonly userId: FieldRef<"Watchlist", 'String'>
    readonly movieId: FieldRef<"Watchlist", 'Int'>
    readonly TVId: FieldRef<"Watchlist", 'Int'>
    readonly type: FieldRef<"Watchlist", 'ShowType'>
    readonly createdAt: FieldRef<"Watchlist", 'DateTime'>
    readonly updatedAt: FieldRef<"Watchlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Watchlist findUnique
   */
  export type WatchlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist findUniqueOrThrow
   */
  export type WatchlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist findFirst
   */
  export type WatchlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist findFirstOrThrow
   */
  export type WatchlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist findMany
   */
  export type WatchlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlists to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist create
   */
  export type WatchlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Watchlist.
     */
    data: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>
  }

  /**
   * Watchlist createMany
   */
  export type WatchlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Watchlist createManyAndReturn
   */
  export type WatchlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watchlist update
   */
  export type WatchlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Watchlist.
     */
    data: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>
    /**
     * Choose, which Watchlist to update.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist updateMany
   */
  export type WatchlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Watchlists.
     */
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyInput>
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number
  }

  /**
   * Watchlist updateManyAndReturn
   */
  export type WatchlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * The data used to update Watchlists.
     */
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyInput>
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watchlist upsert
   */
  export type WatchlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Watchlist to update in case it exists.
     */
    where: WatchlistWhereUniqueInput
    /**
     * In case the Watchlist found by the `where` argument doesn't exist, create a new Watchlist with this data.
     */
    create: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>
    /**
     * In case the Watchlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>
  }

  /**
   * Watchlist delete
   */
  export type WatchlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter which Watchlist to delete.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist deleteMany
   */
  export type WatchlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watchlists to delete
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to delete.
     */
    limit?: number
  }

  /**
   * Watchlist.TVShow
   */
  export type Watchlist$TVShowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    where?: TVShowWhereInput
  }

  /**
   * Watchlist.movie
   */
  export type Watchlist$movieArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
  }

  /**
   * Watchlist without action
   */
  export type WatchlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
  }


  /**
   * Model List
   */

  export type AggregateList = {
    _count: ListCountAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  export type ListMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    userId: string | null
  }

  export type ListMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    userId: string | null
  }

  export type ListCountAggregateOutputType = {
    id: number
    name: number
    description: number
    userId: number
    _all: number
  }


  export type ListMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    userId?: true
  }

  export type ListMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    userId?: true
  }

  export type ListCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    userId?: true
    _all?: true
  }

  export type ListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which List to aggregate.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lists
    **/
    _count?: true | ListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListMaxAggregateInputType
  }

  export type GetListAggregateType<T extends ListAggregateArgs> = {
        [P in keyof T & keyof AggregateList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList[P]>
      : GetScalarType<T[P], AggregateList[P]>
  }




  export type ListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
    orderBy?: ListOrderByWithAggregationInput | ListOrderByWithAggregationInput[]
    by: ListScalarFieldEnum[] | ListScalarFieldEnum
    having?: ListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListCountAggregateInputType | true
    _min?: ListMinAggregateInputType
    _max?: ListMaxAggregateInputType
  }

  export type ListGroupByOutputType = {
    id: string
    name: string
    description: string | null
    userId: string
    _count: ListCountAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  type GetListGroupByPayload<T extends ListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListGroupByOutputType[P]>
            : GetScalarType<T[P], ListGroupByOutputType[P]>
        }
      >
    >


  export type ListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movies?: boolean | List$moviesArgs<ExtArgs>
    TVShows?: boolean | List$TVShowsArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
  }

  export type ListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "userId", ExtArgs["result"]["list"]>
  export type ListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movies?: boolean | List$moviesArgs<ExtArgs>
    TVShows?: boolean | List$TVShowsArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "List"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      movies: Prisma.$MoviePayload<ExtArgs>[]
      TVShows: Prisma.$TVShowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      userId: string
    }, ExtArgs["result"]["list"]>
    composites: {}
  }

  type ListGetPayload<S extends boolean | null | undefined | ListDefaultArgs> = $Result.GetResult<Prisma.$ListPayload, S>

  type ListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListCountAggregateInputType | true
    }

  export interface ListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['List'], meta: { name: 'List' } }
    /**
     * Find zero or one List that matches the filter.
     * @param {ListFindUniqueArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListFindUniqueArgs>(args: SelectSubset<T, ListFindUniqueArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one List that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListFindUniqueOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListFindUniqueOrThrowArgs>(args: SelectSubset<T, ListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first List that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListFindFirstArgs>(args?: SelectSubset<T, ListFindFirstArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first List that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListFindFirstOrThrowArgs>(args?: SelectSubset<T, ListFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lists
     * const lists = await prisma.list.findMany()
     * 
     * // Get first 10 Lists
     * const lists = await prisma.list.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listWithIdOnly = await prisma.list.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListFindManyArgs>(args?: SelectSubset<T, ListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a List.
     * @param {ListCreateArgs} args - Arguments to create a List.
     * @example
     * // Create one List
     * const List = await prisma.list.create({
     *   data: {
     *     // ... data to create a List
     *   }
     * })
     * 
     */
    create<T extends ListCreateArgs>(args: SelectSubset<T, ListCreateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lists.
     * @param {ListCreateManyArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListCreateManyArgs>(args?: SelectSubset<T, ListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lists and returns the data saved in the database.
     * @param {ListCreateManyAndReturnArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListCreateManyAndReturnArgs>(args?: SelectSubset<T, ListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a List.
     * @param {ListDeleteArgs} args - Arguments to delete one List.
     * @example
     * // Delete one List
     * const List = await prisma.list.delete({
     *   where: {
     *     // ... filter to delete one List
     *   }
     * })
     * 
     */
    delete<T extends ListDeleteArgs>(args: SelectSubset<T, ListDeleteArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one List.
     * @param {ListUpdateArgs} args - Arguments to update one List.
     * @example
     * // Update one List
     * const list = await prisma.list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListUpdateArgs>(args: SelectSubset<T, ListUpdateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lists.
     * @param {ListDeleteManyArgs} args - Arguments to filter Lists to delete.
     * @example
     * // Delete a few Lists
     * const { count } = await prisma.list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListDeleteManyArgs>(args?: SelectSubset<T, ListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListUpdateManyArgs>(args: SelectSubset<T, ListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists and returns the data updated in the database.
     * @param {ListUpdateManyAndReturnArgs} args - Arguments to update many Lists.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListUpdateManyAndReturnArgs>(args: SelectSubset<T, ListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one List.
     * @param {ListUpsertArgs} args - Arguments to update or create a List.
     * @example
     * // Update or create a List
     * const list = await prisma.list.upsert({
     *   create: {
     *     // ... data to create a List
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List we want to update
     *   }
     * })
     */
    upsert<T extends ListUpsertArgs>(args: SelectSubset<T, ListUpsertArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListCountArgs} args - Arguments to filter Lists to count.
     * @example
     * // Count the number of Lists
     * const count = await prisma.list.count({
     *   where: {
     *     // ... the filter for the Lists we want to count
     *   }
     * })
    **/
    count<T extends ListCountArgs>(
      args?: Subset<T, ListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListAggregateArgs>(args: Subset<T, ListAggregateArgs>): Prisma.PrismaPromise<GetListAggregateType<T>>

    /**
     * Group by List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListGroupByArgs['orderBy'] }
        : { orderBy?: ListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the List model
   */
  readonly fields: ListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movies<T extends List$moviesArgs<ExtArgs> = {}>(args?: Subset<T, List$moviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    TVShows<T extends List$TVShowsArgs<ExtArgs> = {}>(args?: Subset<T, List$TVShowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TVShowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the List model
   */
  interface ListFieldRefs {
    readonly id: FieldRef<"List", 'String'>
    readonly name: FieldRef<"List", 'String'>
    readonly description: FieldRef<"List", 'String'>
    readonly userId: FieldRef<"List", 'String'>
  }
    

  // Custom InputTypes
  /**
   * List findUnique
   */
  export type ListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findUniqueOrThrow
   */
  export type ListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findFirst
   */
  export type ListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findFirstOrThrow
   */
  export type ListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findMany
   */
  export type ListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which Lists to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List create
   */
  export type ListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to create a List.
     */
    data: XOR<ListCreateInput, ListUncheckedCreateInput>
  }

  /**
   * List createMany
   */
  export type ListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * List createManyAndReturn
   */
  export type ListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * List update
   */
  export type ListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to update a List.
     */
    data: XOR<ListUpdateInput, ListUncheckedUpdateInput>
    /**
     * Choose, which List to update.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List updateMany
   */
  export type ListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to update.
     */
    limit?: number
  }

  /**
   * List updateManyAndReturn
   */
  export type ListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * List upsert
   */
  export type ListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The filter to search for the List to update in case it exists.
     */
    where: ListWhereUniqueInput
    /**
     * In case the List found by the `where` argument doesn't exist, create a new List with this data.
     */
    create: XOR<ListCreateInput, ListUncheckedCreateInput>
    /**
     * In case the List was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListUpdateInput, ListUncheckedUpdateInput>
  }

  /**
   * List delete
   */
  export type ListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter which List to delete.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List deleteMany
   */
  export type ListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lists to delete
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to delete.
     */
    limit?: number
  }

  /**
   * List.movies
   */
  export type List$moviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    cursor?: MovieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * List.TVShows
   */
  export type List$TVShowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TVShow
     */
    select?: TVShowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TVShow
     */
    omit?: TVShowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TVShowInclude<ExtArgs> | null
    where?: TVShowWhereInput
    orderBy?: TVShowOrderByWithRelationInput | TVShowOrderByWithRelationInput[]
    cursor?: TVShowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TVShowScalarFieldEnum | TVShowScalarFieldEnum[]
  }

  /**
   * List without action
   */
  export type ListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    bio: 'bio'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const PersonScalarFieldEnum: {
    id: 'id',
    name: 'name',
    profile_path: 'profile_path',
    job: 'job'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const MovieScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    poster: 'poster',
    release_date: 'release_date',
    runtime: 'runtime'
  };

  export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum]


  export const MovieGenreScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type MovieGenreScalarFieldEnum = (typeof MovieGenreScalarFieldEnum)[keyof typeof MovieGenreScalarFieldEnum]


  export const ProductionCompanyScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type ProductionCompanyScalarFieldEnum = (typeof ProductionCompanyScalarFieldEnum)[keyof typeof ProductionCompanyScalarFieldEnum]


  export const TVShowScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    endYear: 'endYear',
    poster: 'poster',
    first_air_date: 'first_air_date'
  };

  export type TVShowScalarFieldEnum = (typeof TVShowScalarFieldEnum)[keyof typeof TVShowScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    userId: 'userId',
    movieId: 'movieId',
    TVId: 'TVId',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const WatchedScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    movieId: 'movieId',
    TVId: 'TVId',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WatchedScalarFieldEnum = (typeof WatchedScalarFieldEnum)[keyof typeof WatchedScalarFieldEnum]


  export const WatchlistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    movieId: 'movieId',
    TVId: 'TVId',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WatchlistScalarFieldEnum = (typeof WatchlistScalarFieldEnum)[keyof typeof WatchlistScalarFieldEnum]


  export const ListScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    userId: 'userId'
  };

  export type ListScalarFieldEnum = (typeof ListScalarFieldEnum)[keyof typeof ListScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'ShowType'
   */
  export type EnumShowTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShowType'>
    


  /**
   * Reference to a field of type 'ShowType[]'
   */
  export type ListEnumShowTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShowType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bio?: StringNullableFilter<"User"> | string | null
    lists?: ListListRelationFilter
    reviews?: ReviewListRelationFilter
    watched?: WatchedListRelationFilter
    watchlists?: WatchlistListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrderInput | SortOrder
    lists?: ListOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    watched?: WatchedOrderByRelationAggregateInput
    watchlists?: WatchlistOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    bio?: StringNullableFilter<"User"> | string | null
    lists?: ListListRelationFilter
    reviews?: ReviewListRelationFilter
    watched?: WatchedListRelationFilter
    watchlists?: WatchlistListRelationFilter
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "name" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type PersonWhereInput = {
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    id?: IntFilter<"Person"> | number
    name?: StringFilter<"Person"> | string
    profile_path?: StringFilter<"Person"> | string
    job?: StringNullableListFilter<"Person">
    directedMovies?: MovieListRelationFilter
    producedMovies?: MovieListRelationFilter
    execProducedMovies?: MovieListRelationFilter
    writtenMovies?: MovieListRelationFilter
    composedMovies?: MovieListRelationFilter
    cinematographyMovies?: MovieListRelationFilter
  }

  export type PersonOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    profile_path?: SortOrder
    job?: SortOrder
    directedMovies?: MovieOrderByRelationAggregateInput
    producedMovies?: MovieOrderByRelationAggregateInput
    execProducedMovies?: MovieOrderByRelationAggregateInput
    writtenMovies?: MovieOrderByRelationAggregateInput
    composedMovies?: MovieOrderByRelationAggregateInput
    cinematographyMovies?: MovieOrderByRelationAggregateInput
  }

  export type PersonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    name?: StringFilter<"Person"> | string
    profile_path?: StringFilter<"Person"> | string
    job?: StringNullableListFilter<"Person">
    directedMovies?: MovieListRelationFilter
    producedMovies?: MovieListRelationFilter
    execProducedMovies?: MovieListRelationFilter
    writtenMovies?: MovieListRelationFilter
    composedMovies?: MovieListRelationFilter
    cinematographyMovies?: MovieListRelationFilter
  }, "id">

  export type PersonOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    profile_path?: SortOrder
    job?: SortOrder
    _count?: PersonCountOrderByAggregateInput
    _avg?: PersonAvgOrderByAggregateInput
    _max?: PersonMaxOrderByAggregateInput
    _min?: PersonMinOrderByAggregateInput
    _sum?: PersonSumOrderByAggregateInput
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    OR?: PersonScalarWhereWithAggregatesInput[]
    NOT?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Person"> | number
    name?: StringWithAggregatesFilter<"Person"> | string
    profile_path?: StringWithAggregatesFilter<"Person"> | string
    job?: StringNullableListFilter<"Person">
  }

  export type MovieWhereInput = {
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    id?: IntFilter<"Movie"> | number
    title?: StringFilter<"Movie"> | string
    description?: StringNullableFilter<"Movie"> | string | null
    poster?: StringNullableFilter<"Movie"> | string | null
    release_date?: DateTimeNullableFilter<"Movie"> | Date | string | null
    runtime?: IntNullableFilter<"Movie"> | number | null
    genres?: MovieGenreListRelationFilter
    productionCompanies?: ProductionCompanyListRelationFilter
    reviews?: ReviewListRelationFilter
    watched?: WatchedListRelationFilter
    watchlists?: WatchlistListRelationFilter
    lists?: ListListRelationFilter
    directors?: PersonListRelationFilter
    producers?: PersonListRelationFilter
    execProducers?: PersonListRelationFilter
    writers?: PersonListRelationFilter
    composers?: PersonListRelationFilter
    cinematographers?: PersonListRelationFilter
  }

  export type MovieOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    release_date?: SortOrderInput | SortOrder
    runtime?: SortOrderInput | SortOrder
    genres?: MovieGenreOrderByRelationAggregateInput
    productionCompanies?: ProductionCompanyOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    watched?: WatchedOrderByRelationAggregateInput
    watchlists?: WatchlistOrderByRelationAggregateInput
    lists?: ListOrderByRelationAggregateInput
    directors?: PersonOrderByRelationAggregateInput
    producers?: PersonOrderByRelationAggregateInput
    execProducers?: PersonOrderByRelationAggregateInput
    writers?: PersonOrderByRelationAggregateInput
    composers?: PersonOrderByRelationAggregateInput
    cinematographers?: PersonOrderByRelationAggregateInput
  }

  export type MovieWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    title?: StringFilter<"Movie"> | string
    description?: StringNullableFilter<"Movie"> | string | null
    poster?: StringNullableFilter<"Movie"> | string | null
    release_date?: DateTimeNullableFilter<"Movie"> | Date | string | null
    runtime?: IntNullableFilter<"Movie"> | number | null
    genres?: MovieGenreListRelationFilter
    productionCompanies?: ProductionCompanyListRelationFilter
    reviews?: ReviewListRelationFilter
    watched?: WatchedListRelationFilter
    watchlists?: WatchlistListRelationFilter
    lists?: ListListRelationFilter
    directors?: PersonListRelationFilter
    producers?: PersonListRelationFilter
    execProducers?: PersonListRelationFilter
    writers?: PersonListRelationFilter
    composers?: PersonListRelationFilter
    cinematographers?: PersonListRelationFilter
  }, "id">

  export type MovieOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    release_date?: SortOrderInput | SortOrder
    runtime?: SortOrderInput | SortOrder
    _count?: MovieCountOrderByAggregateInput
    _avg?: MovieAvgOrderByAggregateInput
    _max?: MovieMaxOrderByAggregateInput
    _min?: MovieMinOrderByAggregateInput
    _sum?: MovieSumOrderByAggregateInput
  }

  export type MovieScalarWhereWithAggregatesInput = {
    AND?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    OR?: MovieScalarWhereWithAggregatesInput[]
    NOT?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Movie"> | number
    title?: StringWithAggregatesFilter<"Movie"> | string
    description?: StringNullableWithAggregatesFilter<"Movie"> | string | null
    poster?: StringNullableWithAggregatesFilter<"Movie"> | string | null
    release_date?: DateTimeNullableWithAggregatesFilter<"Movie"> | Date | string | null
    runtime?: IntNullableWithAggregatesFilter<"Movie"> | number | null
  }

  export type MovieGenreWhereInput = {
    AND?: MovieGenreWhereInput | MovieGenreWhereInput[]
    OR?: MovieGenreWhereInput[]
    NOT?: MovieGenreWhereInput | MovieGenreWhereInput[]
    id?: IntFilter<"MovieGenre"> | number
    name?: StringFilter<"MovieGenre"> | string
    movies?: MovieListRelationFilter
  }

  export type MovieGenreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    movies?: MovieOrderByRelationAggregateInput
  }

  export type MovieGenreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MovieGenreWhereInput | MovieGenreWhereInput[]
    OR?: MovieGenreWhereInput[]
    NOT?: MovieGenreWhereInput | MovieGenreWhereInput[]
    name?: StringFilter<"MovieGenre"> | string
    movies?: MovieListRelationFilter
  }, "id">

  export type MovieGenreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: MovieGenreCountOrderByAggregateInput
    _avg?: MovieGenreAvgOrderByAggregateInput
    _max?: MovieGenreMaxOrderByAggregateInput
    _min?: MovieGenreMinOrderByAggregateInput
    _sum?: MovieGenreSumOrderByAggregateInput
  }

  export type MovieGenreScalarWhereWithAggregatesInput = {
    AND?: MovieGenreScalarWhereWithAggregatesInput | MovieGenreScalarWhereWithAggregatesInput[]
    OR?: MovieGenreScalarWhereWithAggregatesInput[]
    NOT?: MovieGenreScalarWhereWithAggregatesInput | MovieGenreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MovieGenre"> | number
    name?: StringWithAggregatesFilter<"MovieGenre"> | string
  }

  export type ProductionCompanyWhereInput = {
    AND?: ProductionCompanyWhereInput | ProductionCompanyWhereInput[]
    OR?: ProductionCompanyWhereInput[]
    NOT?: ProductionCompanyWhereInput | ProductionCompanyWhereInput[]
    id?: IntFilter<"ProductionCompany"> | number
    name?: StringFilter<"ProductionCompany"> | string
    movies?: MovieListRelationFilter
  }

  export type ProductionCompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    movies?: MovieOrderByRelationAggregateInput
  }

  export type ProductionCompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductionCompanyWhereInput | ProductionCompanyWhereInput[]
    OR?: ProductionCompanyWhereInput[]
    NOT?: ProductionCompanyWhereInput | ProductionCompanyWhereInput[]
    name?: StringFilter<"ProductionCompany"> | string
    movies?: MovieListRelationFilter
  }, "id">

  export type ProductionCompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: ProductionCompanyCountOrderByAggregateInput
    _avg?: ProductionCompanyAvgOrderByAggregateInput
    _max?: ProductionCompanyMaxOrderByAggregateInput
    _min?: ProductionCompanyMinOrderByAggregateInput
    _sum?: ProductionCompanySumOrderByAggregateInput
  }

  export type ProductionCompanyScalarWhereWithAggregatesInput = {
    AND?: ProductionCompanyScalarWhereWithAggregatesInput | ProductionCompanyScalarWhereWithAggregatesInput[]
    OR?: ProductionCompanyScalarWhereWithAggregatesInput[]
    NOT?: ProductionCompanyScalarWhereWithAggregatesInput | ProductionCompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductionCompany"> | number
    name?: StringWithAggregatesFilter<"ProductionCompany"> | string
  }

  export type TVShowWhereInput = {
    AND?: TVShowWhereInput | TVShowWhereInput[]
    OR?: TVShowWhereInput[]
    NOT?: TVShowWhereInput | TVShowWhereInput[]
    id?: IntFilter<"TVShow"> | number
    title?: StringFilter<"TVShow"> | string
    description?: StringNullableFilter<"TVShow"> | string | null
    endYear?: IntNullableFilter<"TVShow"> | number | null
    poster?: StringNullableFilter<"TVShow"> | string | null
    first_air_date?: DateTimeNullableFilter<"TVShow"> | Date | string | null
    reviews?: ReviewListRelationFilter
    watched?: WatchedListRelationFilter
    watchlists?: WatchlistListRelationFilter
    lists?: ListListRelationFilter
  }

  export type TVShowOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    endYear?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    first_air_date?: SortOrderInput | SortOrder
    reviews?: ReviewOrderByRelationAggregateInput
    watched?: WatchedOrderByRelationAggregateInput
    watchlists?: WatchlistOrderByRelationAggregateInput
    lists?: ListOrderByRelationAggregateInput
  }

  export type TVShowWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TVShowWhereInput | TVShowWhereInput[]
    OR?: TVShowWhereInput[]
    NOT?: TVShowWhereInput | TVShowWhereInput[]
    title?: StringFilter<"TVShow"> | string
    description?: StringNullableFilter<"TVShow"> | string | null
    endYear?: IntNullableFilter<"TVShow"> | number | null
    poster?: StringNullableFilter<"TVShow"> | string | null
    first_air_date?: DateTimeNullableFilter<"TVShow"> | Date | string | null
    reviews?: ReviewListRelationFilter
    watched?: WatchedListRelationFilter
    watchlists?: WatchlistListRelationFilter
    lists?: ListListRelationFilter
  }, "id">

  export type TVShowOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    endYear?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    first_air_date?: SortOrderInput | SortOrder
    _count?: TVShowCountOrderByAggregateInput
    _avg?: TVShowAvgOrderByAggregateInput
    _max?: TVShowMaxOrderByAggregateInput
    _min?: TVShowMinOrderByAggregateInput
    _sum?: TVShowSumOrderByAggregateInput
  }

  export type TVShowScalarWhereWithAggregatesInput = {
    AND?: TVShowScalarWhereWithAggregatesInput | TVShowScalarWhereWithAggregatesInput[]
    OR?: TVShowScalarWhereWithAggregatesInput[]
    NOT?: TVShowScalarWhereWithAggregatesInput | TVShowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TVShow"> | number
    title?: StringWithAggregatesFilter<"TVShow"> | string
    description?: StringNullableWithAggregatesFilter<"TVShow"> | string | null
    endYear?: IntNullableWithAggregatesFilter<"TVShow"> | number | null
    poster?: StringNullableWithAggregatesFilter<"TVShow"> | string | null
    first_air_date?: DateTimeNullableWithAggregatesFilter<"TVShow"> | Date | string | null
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: FloatFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    userId?: StringFilter<"Review"> | string
    movieId?: IntNullableFilter<"Review"> | number | null
    TVId?: IntNullableFilter<"Review"> | number | null
    type?: EnumShowTypeFilter<"Review"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
    movie?: XOR<MovieNullableScalarRelationFilter, MovieWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    userId?: SortOrder
    movieId?: SortOrderInput | SortOrder
    TVId?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    TVShow?: TVShowOrderByWithRelationInput
    movie?: MovieOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: FloatFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    userId?: StringFilter<"Review"> | string
    movieId?: IntNullableFilter<"Review"> | number | null
    TVId?: IntNullableFilter<"Review"> | number | null
    type?: EnumShowTypeFilter<"Review"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
    movie?: XOR<MovieNullableScalarRelationFilter, MovieWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    userId?: SortOrder
    movieId?: SortOrderInput | SortOrder
    TVId?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    rating?: FloatWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    userId?: StringWithAggregatesFilter<"Review"> | string
    movieId?: IntNullableWithAggregatesFilter<"Review"> | number | null
    TVId?: IntNullableWithAggregatesFilter<"Review"> | number | null
    type?: EnumShowTypeWithAggregatesFilter<"Review"> | $Enums.ShowType
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type WatchedWhereInput = {
    AND?: WatchedWhereInput | WatchedWhereInput[]
    OR?: WatchedWhereInput[]
    NOT?: WatchedWhereInput | WatchedWhereInput[]
    id?: StringFilter<"Watched"> | string
    userId?: StringFilter<"Watched"> | string
    movieId?: IntNullableFilter<"Watched"> | number | null
    TVId?: IntNullableFilter<"Watched"> | number | null
    type?: EnumShowTypeFilter<"Watched"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Watched"> | Date | string
    updatedAt?: DateTimeFilter<"Watched"> | Date | string
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
    movie?: XOR<MovieNullableScalarRelationFilter, MovieWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WatchedOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrderInput | SortOrder
    TVId?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    TVShow?: TVShowOrderByWithRelationInput
    movie?: MovieOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WatchedWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WatchedWhereInput | WatchedWhereInput[]
    OR?: WatchedWhereInput[]
    NOT?: WatchedWhereInput | WatchedWhereInput[]
    userId?: StringFilter<"Watched"> | string
    movieId?: IntNullableFilter<"Watched"> | number | null
    TVId?: IntNullableFilter<"Watched"> | number | null
    type?: EnumShowTypeFilter<"Watched"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Watched"> | Date | string
    updatedAt?: DateTimeFilter<"Watched"> | Date | string
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
    movie?: XOR<MovieNullableScalarRelationFilter, MovieWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WatchedOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrderInput | SortOrder
    TVId?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WatchedCountOrderByAggregateInput
    _avg?: WatchedAvgOrderByAggregateInput
    _max?: WatchedMaxOrderByAggregateInput
    _min?: WatchedMinOrderByAggregateInput
    _sum?: WatchedSumOrderByAggregateInput
  }

  export type WatchedScalarWhereWithAggregatesInput = {
    AND?: WatchedScalarWhereWithAggregatesInput | WatchedScalarWhereWithAggregatesInput[]
    OR?: WatchedScalarWhereWithAggregatesInput[]
    NOT?: WatchedScalarWhereWithAggregatesInput | WatchedScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Watched"> | string
    userId?: StringWithAggregatesFilter<"Watched"> | string
    movieId?: IntNullableWithAggregatesFilter<"Watched"> | number | null
    TVId?: IntNullableWithAggregatesFilter<"Watched"> | number | null
    type?: EnumShowTypeWithAggregatesFilter<"Watched"> | $Enums.ShowType
    createdAt?: DateTimeWithAggregatesFilter<"Watched"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Watched"> | Date | string
  }

  export type WatchlistWhereInput = {
    AND?: WatchlistWhereInput | WatchlistWhereInput[]
    OR?: WatchlistWhereInput[]
    NOT?: WatchlistWhereInput | WatchlistWhereInput[]
    id?: StringFilter<"Watchlist"> | string
    userId?: StringFilter<"Watchlist"> | string
    movieId?: IntNullableFilter<"Watchlist"> | number | null
    TVId?: IntNullableFilter<"Watchlist"> | number | null
    type?: EnumShowTypeFilter<"Watchlist"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    updatedAt?: DateTimeFilter<"Watchlist"> | Date | string
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
    movie?: XOR<MovieNullableScalarRelationFilter, MovieWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WatchlistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrderInput | SortOrder
    TVId?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    TVShow?: TVShowOrderByWithRelationInput
    movie?: MovieOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WatchlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WatchlistWhereInput | WatchlistWhereInput[]
    OR?: WatchlistWhereInput[]
    NOT?: WatchlistWhereInput | WatchlistWhereInput[]
    userId?: StringFilter<"Watchlist"> | string
    movieId?: IntNullableFilter<"Watchlist"> | number | null
    TVId?: IntNullableFilter<"Watchlist"> | number | null
    type?: EnumShowTypeFilter<"Watchlist"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    updatedAt?: DateTimeFilter<"Watchlist"> | Date | string
    TVShow?: XOR<TVShowNullableScalarRelationFilter, TVShowWhereInput> | null
    movie?: XOR<MovieNullableScalarRelationFilter, MovieWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type WatchlistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrderInput | SortOrder
    TVId?: SortOrderInput | SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WatchlistCountOrderByAggregateInput
    _avg?: WatchlistAvgOrderByAggregateInput
    _max?: WatchlistMaxOrderByAggregateInput
    _min?: WatchlistMinOrderByAggregateInput
    _sum?: WatchlistSumOrderByAggregateInput
  }

  export type WatchlistScalarWhereWithAggregatesInput = {
    AND?: WatchlistScalarWhereWithAggregatesInput | WatchlistScalarWhereWithAggregatesInput[]
    OR?: WatchlistScalarWhereWithAggregatesInput[]
    NOT?: WatchlistScalarWhereWithAggregatesInput | WatchlistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Watchlist"> | string
    userId?: StringWithAggregatesFilter<"Watchlist"> | string
    movieId?: IntNullableWithAggregatesFilter<"Watchlist"> | number | null
    TVId?: IntNullableWithAggregatesFilter<"Watchlist"> | number | null
    type?: EnumShowTypeWithAggregatesFilter<"Watchlist"> | $Enums.ShowType
    createdAt?: DateTimeWithAggregatesFilter<"Watchlist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Watchlist"> | Date | string
  }

  export type ListWhereInput = {
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    id?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    description?: StringNullableFilter<"List"> | string | null
    userId?: StringFilter<"List"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    movies?: MovieListRelationFilter
    TVShows?: TVShowListRelationFilter
  }

  export type ListOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    movies?: MovieOrderByRelationAggregateInput
    TVShows?: TVShowOrderByRelationAggregateInput
  }

  export type ListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    name?: StringFilter<"List"> | string
    description?: StringNullableFilter<"List"> | string | null
    userId?: StringFilter<"List"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    movies?: MovieListRelationFilter
    TVShows?: TVShowListRelationFilter
  }, "id">

  export type ListOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: ListCountOrderByAggregateInput
    _max?: ListMaxOrderByAggregateInput
    _min?: ListMinOrderByAggregateInput
  }

  export type ListScalarWhereWithAggregatesInput = {
    AND?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    OR?: ListScalarWhereWithAggregatesInput[]
    NOT?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"List"> | string
    name?: StringWithAggregatesFilter<"List"> | string
    description?: StringNullableWithAggregatesFilter<"List"> | string | null
    userId?: StringWithAggregatesFilter<"List"> | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    watched?: WatchedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    watched?: WatchedUncheckedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    watched?: WatchedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PersonCreateInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieCreateNestedManyWithoutWritersInput
    composedMovies?: MovieCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUncheckedCreateInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieUncheckedCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieUncheckedCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieUncheckedCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieUncheckedCreateNestedManyWithoutWritersInput
    composedMovies?: MovieUncheckedCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieUncheckedCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUncheckedUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUncheckedUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUncheckedUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUncheckedUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUncheckedUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUncheckedUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonCreateManyInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
  }

  export type PersonUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type PersonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type MovieCreateInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
  }

  export type MovieUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieGenreCreateInput = {
    id: number
    name: string
    movies?: MovieCreateNestedManyWithoutGenresInput
  }

  export type MovieGenreUncheckedCreateInput = {
    id: number
    name: string
    movies?: MovieUncheckedCreateNestedManyWithoutGenresInput
  }

  export type MovieGenreUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    movies?: MovieUpdateManyWithoutGenresNestedInput
  }

  export type MovieGenreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    movies?: MovieUncheckedUpdateManyWithoutGenresNestedInput
  }

  export type MovieGenreCreateManyInput = {
    id: number
    name: string
  }

  export type MovieGenreUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductionCompanyCreateInput = {
    id: number
    name: string
    movies?: MovieCreateNestedManyWithoutProductionCompaniesInput
  }

  export type ProductionCompanyUncheckedCreateInput = {
    id: number
    name: string
    movies?: MovieUncheckedCreateNestedManyWithoutProductionCompaniesInput
  }

  export type ProductionCompanyUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    movies?: MovieUpdateManyWithoutProductionCompaniesNestedInput
  }

  export type ProductionCompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    movies?: MovieUncheckedUpdateManyWithoutProductionCompaniesNestedInput
  }

  export type ProductionCompanyCreateManyInput = {
    id: number
    name: string
  }

  export type ProductionCompanyUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductionCompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TVShowCreateInput = {
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewCreateNestedManyWithoutTVShowInput
    watched?: WatchedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistCreateNestedManyWithoutTVShowInput
    lists?: ListCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutTVShowInput
    watched?: WatchedUncheckedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutTVShowInput
    lists?: ListUncheckedCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUpdateManyWithoutTVShowNestedInput
    watched?: WatchedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUpdateManyWithoutTVShowNestedInput
    lists?: ListUpdateManyWithoutTVShowsNestedInput
  }

  export type TVShowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutTVShowNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutTVShowNestedInput
    lists?: ListUncheckedUpdateManyWithoutTVShowsNestedInput
  }

  export type TVShowCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
  }

  export type TVShowUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TVShowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutReviewsInput
    movie?: MovieCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    userId: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutReviewsNestedInput
    movie?: MovieUpdateOneWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    rating: number
    comment?: string | null
    userId: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedCreateInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutWatchedInput
    movie?: MovieCreateNestedOneWithoutWatchedInput
    user: UserCreateNestedOneWithoutWatchedInput
  }

  export type WatchedUncheckedCreateInput = {
    id?: string
    userId: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutWatchedNestedInput
    movie?: MovieUpdateOneWithoutWatchedNestedInput
    user?: UserUpdateOneRequiredWithoutWatchedNestedInput
  }

  export type WatchedUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedCreateManyInput = {
    id?: string
    userId: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistCreateInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutWatchlistsInput
    movie?: MovieCreateNestedOneWithoutWatchlistsInput
    user: UserCreateNestedOneWithoutWatchlistsInput
  }

  export type WatchlistUncheckedCreateInput = {
    id?: string
    userId: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutWatchlistsNestedInput
    movie?: MovieUpdateOneWithoutWatchlistsNestedInput
    user?: UserUpdateOneRequiredWithoutWatchlistsNestedInput
  }

  export type WatchlistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistCreateManyInput = {
    id?: string
    userId: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListCreateInput = {
    id?: string
    name: string
    description?: string | null
    user: UserCreateNestedOneWithoutListsInput
    movies?: MovieCreateNestedManyWithoutListsInput
    TVShows?: TVShowCreateNestedManyWithoutListsInput
  }

  export type ListUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    movies?: MovieUncheckedCreateNestedManyWithoutListsInput
    TVShows?: TVShowUncheckedCreateNestedManyWithoutListsInput
  }

  export type ListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    movies?: MovieUpdateManyWithoutListsNestedInput
    TVShows?: TVShowUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    movies?: MovieUncheckedUpdateManyWithoutListsNestedInput
    TVShows?: TVShowUncheckedUpdateManyWithoutListsNestedInput
  }

  export type ListCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
  }

  export type ListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ListListRelationFilter = {
    every?: ListWhereInput
    some?: ListWhereInput
    none?: ListWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type WatchedListRelationFilter = {
    every?: WatchedWhereInput
    some?: WatchedWhereInput
    none?: WatchedWhereInput
  }

  export type WatchlistListRelationFilter = {
    every?: WatchlistWhereInput
    some?: WatchlistWhereInput
    none?: WatchlistWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchedOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bio?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MovieListRelationFilter = {
    every?: MovieWhereInput
    some?: MovieWhereInput
    none?: MovieWhereInput
  }

  export type MovieOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    profile_path?: SortOrder
    job?: SortOrder
  }

  export type PersonAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PersonMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    profile_path?: SortOrder
  }

  export type PersonMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    profile_path?: SortOrder
  }

  export type PersonSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MovieGenreListRelationFilter = {
    every?: MovieGenreWhereInput
    some?: MovieGenreWhereInput
    none?: MovieGenreWhereInput
  }

  export type ProductionCompanyListRelationFilter = {
    every?: ProductionCompanyWhereInput
    some?: ProductionCompanyWhereInput
    none?: ProductionCompanyWhereInput
  }

  export type PersonListRelationFilter = {
    every?: PersonWhereInput
    some?: PersonWhereInput
    none?: PersonWhereInput
  }

  export type MovieGenreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductionCompanyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MovieCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    release_date?: SortOrder
    runtime?: SortOrder
  }

  export type MovieAvgOrderByAggregateInput = {
    id?: SortOrder
    runtime?: SortOrder
  }

  export type MovieMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    release_date?: SortOrder
    runtime?: SortOrder
  }

  export type MovieMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    release_date?: SortOrder
    runtime?: SortOrder
  }

  export type MovieSumOrderByAggregateInput = {
    id?: SortOrder
    runtime?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type MovieGenreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type MovieGenreAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MovieGenreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type MovieGenreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type MovieGenreSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProductionCompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ProductionCompanyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProductionCompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ProductionCompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ProductionCompanySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TVShowCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    endYear?: SortOrder
    poster?: SortOrder
    first_air_date?: SortOrder
  }

  export type TVShowAvgOrderByAggregateInput = {
    id?: SortOrder
    endYear?: SortOrder
  }

  export type TVShowMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    endYear?: SortOrder
    poster?: SortOrder
    first_air_date?: SortOrder
  }

  export type TVShowMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    endYear?: SortOrder
    poster?: SortOrder
    first_air_date?: SortOrder
  }

  export type TVShowSumOrderByAggregateInput = {
    id?: SortOrder
    endYear?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumShowTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ShowType | EnumShowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumShowTypeFilter<$PrismaModel> | $Enums.ShowType
  }

  export type TVShowNullableScalarRelationFilter = {
    is?: TVShowWhereInput | null
    isNot?: TVShowWhereInput | null
  }

  export type MovieNullableScalarRelationFilter = {
    is?: MovieWhereInput | null
    isNot?: MovieWhereInput | null
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumShowTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShowType | EnumShowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumShowTypeWithAggregatesFilter<$PrismaModel> | $Enums.ShowType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShowTypeFilter<$PrismaModel>
    _max?: NestedEnumShowTypeFilter<$PrismaModel>
  }

  export type WatchedCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchedAvgOrderByAggregateInput = {
    movieId?: SortOrder
    TVId?: SortOrder
  }

  export type WatchedMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchedMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchedSumOrderByAggregateInput = {
    movieId?: SortOrder
    TVId?: SortOrder
  }

  export type WatchlistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchlistAvgOrderByAggregateInput = {
    movieId?: SortOrder
    TVId?: SortOrder
  }

  export type WatchlistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchlistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    TVId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchlistSumOrderByAggregateInput = {
    movieId?: SortOrder
    TVId?: SortOrder
  }

  export type TVShowListRelationFilter = {
    every?: TVShowWhereInput
    some?: TVShowWhereInput
    none?: TVShowWhereInput
  }

  export type TVShowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userId?: SortOrder
  }

  export type ListMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userId?: SortOrder
  }

  export type ListMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userId?: SortOrder
  }

  export type ListCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type WatchedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchedCreateWithoutUserInput, WatchedUncheckedCreateWithoutUserInput> | WatchedCreateWithoutUserInput[] | WatchedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutUserInput | WatchedCreateOrConnectWithoutUserInput[]
    createMany?: WatchedCreateManyUserInputEnvelope
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
  }

  export type WatchlistCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type WatchedUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchedCreateWithoutUserInput, WatchedUncheckedCreateWithoutUserInput> | WatchedCreateWithoutUserInput[] | WatchedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutUserInput | WatchedCreateOrConnectWithoutUserInput[]
    createMany?: WatchedCreateManyUserInputEnvelope
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
  }

  export type WatchlistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ListUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type WatchedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchedCreateWithoutUserInput, WatchedUncheckedCreateWithoutUserInput> | WatchedCreateWithoutUserInput[] | WatchedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutUserInput | WatchedCreateOrConnectWithoutUserInput[]
    upsert?: WatchedUpsertWithWhereUniqueWithoutUserInput | WatchedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchedCreateManyUserInputEnvelope
    set?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    disconnect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    delete?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    update?: WatchedUpdateWithWhereUniqueWithoutUserInput | WatchedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchedUpdateManyWithWhereWithoutUserInput | WatchedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
  }

  export type WatchlistUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutUserInput | WatchlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutUserInput | WatchlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutUserInput | WatchlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type WatchedUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchedCreateWithoutUserInput, WatchedUncheckedCreateWithoutUserInput> | WatchedCreateWithoutUserInput[] | WatchedUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutUserInput | WatchedCreateOrConnectWithoutUserInput[]
    upsert?: WatchedUpsertWithWhereUniqueWithoutUserInput | WatchedUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchedCreateManyUserInputEnvelope
    set?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    disconnect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    delete?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    update?: WatchedUpdateWithWhereUniqueWithoutUserInput | WatchedUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchedUpdateManyWithWhereWithoutUserInput | WatchedUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
  }

  export type WatchlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutUserInput | WatchlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutUserInput | WatchlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutUserInput | WatchlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type PersonCreatejobInput = {
    set: string[]
  }

  export type MovieCreateNestedManyWithoutDirectorsInput = {
    create?: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput> | MovieCreateWithoutDirectorsInput[] | MovieUncheckedCreateWithoutDirectorsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutDirectorsInput | MovieCreateOrConnectWithoutDirectorsInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieCreateNestedManyWithoutProducersInput = {
    create?: XOR<MovieCreateWithoutProducersInput, MovieUncheckedCreateWithoutProducersInput> | MovieCreateWithoutProducersInput[] | MovieUncheckedCreateWithoutProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProducersInput | MovieCreateOrConnectWithoutProducersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieCreateNestedManyWithoutExecProducersInput = {
    create?: XOR<MovieCreateWithoutExecProducersInput, MovieUncheckedCreateWithoutExecProducersInput> | MovieCreateWithoutExecProducersInput[] | MovieUncheckedCreateWithoutExecProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutExecProducersInput | MovieCreateOrConnectWithoutExecProducersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieCreateNestedManyWithoutWritersInput = {
    create?: XOR<MovieCreateWithoutWritersInput, MovieUncheckedCreateWithoutWritersInput> | MovieCreateWithoutWritersInput[] | MovieUncheckedCreateWithoutWritersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutWritersInput | MovieCreateOrConnectWithoutWritersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieCreateNestedManyWithoutComposersInput = {
    create?: XOR<MovieCreateWithoutComposersInput, MovieUncheckedCreateWithoutComposersInput> | MovieCreateWithoutComposersInput[] | MovieUncheckedCreateWithoutComposersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutComposersInput | MovieCreateOrConnectWithoutComposersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieCreateNestedManyWithoutCinematographersInput = {
    create?: XOR<MovieCreateWithoutCinematographersInput, MovieUncheckedCreateWithoutCinematographersInput> | MovieCreateWithoutCinematographersInput[] | MovieUncheckedCreateWithoutCinematographersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCinematographersInput | MovieCreateOrConnectWithoutCinematographersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutDirectorsInput = {
    create?: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput> | MovieCreateWithoutDirectorsInput[] | MovieUncheckedCreateWithoutDirectorsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutDirectorsInput | MovieCreateOrConnectWithoutDirectorsInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutProducersInput = {
    create?: XOR<MovieCreateWithoutProducersInput, MovieUncheckedCreateWithoutProducersInput> | MovieCreateWithoutProducersInput[] | MovieUncheckedCreateWithoutProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProducersInput | MovieCreateOrConnectWithoutProducersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutExecProducersInput = {
    create?: XOR<MovieCreateWithoutExecProducersInput, MovieUncheckedCreateWithoutExecProducersInput> | MovieCreateWithoutExecProducersInput[] | MovieUncheckedCreateWithoutExecProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutExecProducersInput | MovieCreateOrConnectWithoutExecProducersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutWritersInput = {
    create?: XOR<MovieCreateWithoutWritersInput, MovieUncheckedCreateWithoutWritersInput> | MovieCreateWithoutWritersInput[] | MovieUncheckedCreateWithoutWritersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutWritersInput | MovieCreateOrConnectWithoutWritersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutComposersInput = {
    create?: XOR<MovieCreateWithoutComposersInput, MovieUncheckedCreateWithoutComposersInput> | MovieCreateWithoutComposersInput[] | MovieUncheckedCreateWithoutComposersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutComposersInput | MovieCreateOrConnectWithoutComposersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutCinematographersInput = {
    create?: XOR<MovieCreateWithoutCinematographersInput, MovieUncheckedCreateWithoutCinematographersInput> | MovieCreateWithoutCinematographersInput[] | MovieUncheckedCreateWithoutCinematographersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCinematographersInput | MovieCreateOrConnectWithoutCinematographersInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PersonUpdatejobInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MovieUpdateManyWithoutDirectorsNestedInput = {
    create?: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput> | MovieCreateWithoutDirectorsInput[] | MovieUncheckedCreateWithoutDirectorsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutDirectorsInput | MovieCreateOrConnectWithoutDirectorsInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutDirectorsInput | MovieUpsertWithWhereUniqueWithoutDirectorsInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutDirectorsInput | MovieUpdateWithWhereUniqueWithoutDirectorsInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutDirectorsInput | MovieUpdateManyWithWhereWithoutDirectorsInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUpdateManyWithoutProducersNestedInput = {
    create?: XOR<MovieCreateWithoutProducersInput, MovieUncheckedCreateWithoutProducersInput> | MovieCreateWithoutProducersInput[] | MovieUncheckedCreateWithoutProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProducersInput | MovieCreateOrConnectWithoutProducersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutProducersInput | MovieUpsertWithWhereUniqueWithoutProducersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutProducersInput | MovieUpdateWithWhereUniqueWithoutProducersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutProducersInput | MovieUpdateManyWithWhereWithoutProducersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUpdateManyWithoutExecProducersNestedInput = {
    create?: XOR<MovieCreateWithoutExecProducersInput, MovieUncheckedCreateWithoutExecProducersInput> | MovieCreateWithoutExecProducersInput[] | MovieUncheckedCreateWithoutExecProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutExecProducersInput | MovieCreateOrConnectWithoutExecProducersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutExecProducersInput | MovieUpsertWithWhereUniqueWithoutExecProducersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutExecProducersInput | MovieUpdateWithWhereUniqueWithoutExecProducersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutExecProducersInput | MovieUpdateManyWithWhereWithoutExecProducersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUpdateManyWithoutWritersNestedInput = {
    create?: XOR<MovieCreateWithoutWritersInput, MovieUncheckedCreateWithoutWritersInput> | MovieCreateWithoutWritersInput[] | MovieUncheckedCreateWithoutWritersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutWritersInput | MovieCreateOrConnectWithoutWritersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutWritersInput | MovieUpsertWithWhereUniqueWithoutWritersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutWritersInput | MovieUpdateWithWhereUniqueWithoutWritersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutWritersInput | MovieUpdateManyWithWhereWithoutWritersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUpdateManyWithoutComposersNestedInput = {
    create?: XOR<MovieCreateWithoutComposersInput, MovieUncheckedCreateWithoutComposersInput> | MovieCreateWithoutComposersInput[] | MovieUncheckedCreateWithoutComposersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutComposersInput | MovieCreateOrConnectWithoutComposersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutComposersInput | MovieUpsertWithWhereUniqueWithoutComposersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutComposersInput | MovieUpdateWithWhereUniqueWithoutComposersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutComposersInput | MovieUpdateManyWithWhereWithoutComposersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUpdateManyWithoutCinematographersNestedInput = {
    create?: XOR<MovieCreateWithoutCinematographersInput, MovieUncheckedCreateWithoutCinematographersInput> | MovieCreateWithoutCinematographersInput[] | MovieUncheckedCreateWithoutCinematographersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCinematographersInput | MovieCreateOrConnectWithoutCinematographersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutCinematographersInput | MovieUpsertWithWhereUniqueWithoutCinematographersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutCinematographersInput | MovieUpdateWithWhereUniqueWithoutCinematographersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutCinematographersInput | MovieUpdateManyWithWhereWithoutCinematographersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutDirectorsNestedInput = {
    create?: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput> | MovieCreateWithoutDirectorsInput[] | MovieUncheckedCreateWithoutDirectorsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutDirectorsInput | MovieCreateOrConnectWithoutDirectorsInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutDirectorsInput | MovieUpsertWithWhereUniqueWithoutDirectorsInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutDirectorsInput | MovieUpdateWithWhereUniqueWithoutDirectorsInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutDirectorsInput | MovieUpdateManyWithWhereWithoutDirectorsInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutProducersNestedInput = {
    create?: XOR<MovieCreateWithoutProducersInput, MovieUncheckedCreateWithoutProducersInput> | MovieCreateWithoutProducersInput[] | MovieUncheckedCreateWithoutProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProducersInput | MovieCreateOrConnectWithoutProducersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutProducersInput | MovieUpsertWithWhereUniqueWithoutProducersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutProducersInput | MovieUpdateWithWhereUniqueWithoutProducersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutProducersInput | MovieUpdateManyWithWhereWithoutProducersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutExecProducersNestedInput = {
    create?: XOR<MovieCreateWithoutExecProducersInput, MovieUncheckedCreateWithoutExecProducersInput> | MovieCreateWithoutExecProducersInput[] | MovieUncheckedCreateWithoutExecProducersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutExecProducersInput | MovieCreateOrConnectWithoutExecProducersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutExecProducersInput | MovieUpsertWithWhereUniqueWithoutExecProducersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutExecProducersInput | MovieUpdateWithWhereUniqueWithoutExecProducersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutExecProducersInput | MovieUpdateManyWithWhereWithoutExecProducersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutWritersNestedInput = {
    create?: XOR<MovieCreateWithoutWritersInput, MovieUncheckedCreateWithoutWritersInput> | MovieCreateWithoutWritersInput[] | MovieUncheckedCreateWithoutWritersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutWritersInput | MovieCreateOrConnectWithoutWritersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutWritersInput | MovieUpsertWithWhereUniqueWithoutWritersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutWritersInput | MovieUpdateWithWhereUniqueWithoutWritersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutWritersInput | MovieUpdateManyWithWhereWithoutWritersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutComposersNestedInput = {
    create?: XOR<MovieCreateWithoutComposersInput, MovieUncheckedCreateWithoutComposersInput> | MovieCreateWithoutComposersInput[] | MovieUncheckedCreateWithoutComposersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutComposersInput | MovieCreateOrConnectWithoutComposersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutComposersInput | MovieUpsertWithWhereUniqueWithoutComposersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutComposersInput | MovieUpdateWithWhereUniqueWithoutComposersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutComposersInput | MovieUpdateManyWithWhereWithoutComposersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutCinematographersNestedInput = {
    create?: XOR<MovieCreateWithoutCinematographersInput, MovieUncheckedCreateWithoutCinematographersInput> | MovieCreateWithoutCinematographersInput[] | MovieUncheckedCreateWithoutCinematographersInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutCinematographersInput | MovieCreateOrConnectWithoutCinematographersInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutCinematographersInput | MovieUpsertWithWhereUniqueWithoutCinematographersInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutCinematographersInput | MovieUpdateWithWhereUniqueWithoutCinematographersInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutCinematographersInput | MovieUpdateManyWithWhereWithoutCinematographersInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieGenreCreateNestedManyWithoutMoviesInput = {
    create?: XOR<MovieGenreCreateWithoutMoviesInput, MovieGenreUncheckedCreateWithoutMoviesInput> | MovieGenreCreateWithoutMoviesInput[] | MovieGenreUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMoviesInput | MovieGenreCreateOrConnectWithoutMoviesInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
  }

  export type ProductionCompanyCreateNestedManyWithoutMoviesInput = {
    create?: XOR<ProductionCompanyCreateWithoutMoviesInput, ProductionCompanyUncheckedCreateWithoutMoviesInput> | ProductionCompanyCreateWithoutMoviesInput[] | ProductionCompanyUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ProductionCompanyCreateOrConnectWithoutMoviesInput | ProductionCompanyCreateOrConnectWithoutMoviesInput[]
    connect?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutMovieInput = {
    create?: XOR<ReviewCreateWithoutMovieInput, ReviewUncheckedCreateWithoutMovieInput> | ReviewCreateWithoutMovieInput[] | ReviewUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMovieInput | ReviewCreateOrConnectWithoutMovieInput[]
    createMany?: ReviewCreateManyMovieInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type WatchedCreateNestedManyWithoutMovieInput = {
    create?: XOR<WatchedCreateWithoutMovieInput, WatchedUncheckedCreateWithoutMovieInput> | WatchedCreateWithoutMovieInput[] | WatchedUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutMovieInput | WatchedCreateOrConnectWithoutMovieInput[]
    createMany?: WatchedCreateManyMovieInputEnvelope
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
  }

  export type WatchlistCreateNestedManyWithoutMovieInput = {
    create?: XOR<WatchlistCreateWithoutMovieInput, WatchlistUncheckedCreateWithoutMovieInput> | WatchlistCreateWithoutMovieInput[] | WatchlistUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutMovieInput | WatchlistCreateOrConnectWithoutMovieInput[]
    createMany?: WatchlistCreateManyMovieInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type ListCreateNestedManyWithoutMoviesInput = {
    create?: XOR<ListCreateWithoutMoviesInput, ListUncheckedCreateWithoutMoviesInput> | ListCreateWithoutMoviesInput[] | ListUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ListCreateOrConnectWithoutMoviesInput | ListCreateOrConnectWithoutMoviesInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutDirectedMoviesInput = {
    create?: XOR<PersonCreateWithoutDirectedMoviesInput, PersonUncheckedCreateWithoutDirectedMoviesInput> | PersonCreateWithoutDirectedMoviesInput[] | PersonUncheckedCreateWithoutDirectedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutDirectedMoviesInput | PersonCreateOrConnectWithoutDirectedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutProducedMoviesInput = {
    create?: XOR<PersonCreateWithoutProducedMoviesInput, PersonUncheckedCreateWithoutProducedMoviesInput> | PersonCreateWithoutProducedMoviesInput[] | PersonUncheckedCreateWithoutProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutProducedMoviesInput | PersonCreateOrConnectWithoutProducedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutExecProducedMoviesInput = {
    create?: XOR<PersonCreateWithoutExecProducedMoviesInput, PersonUncheckedCreateWithoutExecProducedMoviesInput> | PersonCreateWithoutExecProducedMoviesInput[] | PersonUncheckedCreateWithoutExecProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutExecProducedMoviesInput | PersonCreateOrConnectWithoutExecProducedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutWrittenMoviesInput = {
    create?: XOR<PersonCreateWithoutWrittenMoviesInput, PersonUncheckedCreateWithoutWrittenMoviesInput> | PersonCreateWithoutWrittenMoviesInput[] | PersonUncheckedCreateWithoutWrittenMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutWrittenMoviesInput | PersonCreateOrConnectWithoutWrittenMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutComposedMoviesInput = {
    create?: XOR<PersonCreateWithoutComposedMoviesInput, PersonUncheckedCreateWithoutComposedMoviesInput> | PersonCreateWithoutComposedMoviesInput[] | PersonUncheckedCreateWithoutComposedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutComposedMoviesInput | PersonCreateOrConnectWithoutComposedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutCinematographyMoviesInput = {
    create?: XOR<PersonCreateWithoutCinematographyMoviesInput, PersonUncheckedCreateWithoutCinematographyMoviesInput> | PersonCreateWithoutCinematographyMoviesInput[] | PersonUncheckedCreateWithoutCinematographyMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutCinematographyMoviesInput | PersonCreateOrConnectWithoutCinematographyMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type MovieGenreUncheckedCreateNestedManyWithoutMoviesInput = {
    create?: XOR<MovieGenreCreateWithoutMoviesInput, MovieGenreUncheckedCreateWithoutMoviesInput> | MovieGenreCreateWithoutMoviesInput[] | MovieGenreUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMoviesInput | MovieGenreCreateOrConnectWithoutMoviesInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
  }

  export type ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput = {
    create?: XOR<ProductionCompanyCreateWithoutMoviesInput, ProductionCompanyUncheckedCreateWithoutMoviesInput> | ProductionCompanyCreateWithoutMoviesInput[] | ProductionCompanyUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ProductionCompanyCreateOrConnectWithoutMoviesInput | ProductionCompanyCreateOrConnectWithoutMoviesInput[]
    connect?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<ReviewCreateWithoutMovieInput, ReviewUncheckedCreateWithoutMovieInput> | ReviewCreateWithoutMovieInput[] | ReviewUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMovieInput | ReviewCreateOrConnectWithoutMovieInput[]
    createMany?: ReviewCreateManyMovieInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type WatchedUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<WatchedCreateWithoutMovieInput, WatchedUncheckedCreateWithoutMovieInput> | WatchedCreateWithoutMovieInput[] | WatchedUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutMovieInput | WatchedCreateOrConnectWithoutMovieInput[]
    createMany?: WatchedCreateManyMovieInputEnvelope
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
  }

  export type WatchlistUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<WatchlistCreateWithoutMovieInput, WatchlistUncheckedCreateWithoutMovieInput> | WatchlistCreateWithoutMovieInput[] | WatchlistUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutMovieInput | WatchlistCreateOrConnectWithoutMovieInput[]
    createMany?: WatchlistCreateManyMovieInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type ListUncheckedCreateNestedManyWithoutMoviesInput = {
    create?: XOR<ListCreateWithoutMoviesInput, ListUncheckedCreateWithoutMoviesInput> | ListCreateWithoutMoviesInput[] | ListUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ListCreateOrConnectWithoutMoviesInput | ListCreateOrConnectWithoutMoviesInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput = {
    create?: XOR<PersonCreateWithoutDirectedMoviesInput, PersonUncheckedCreateWithoutDirectedMoviesInput> | PersonCreateWithoutDirectedMoviesInput[] | PersonUncheckedCreateWithoutDirectedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutDirectedMoviesInput | PersonCreateOrConnectWithoutDirectedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutProducedMoviesInput = {
    create?: XOR<PersonCreateWithoutProducedMoviesInput, PersonUncheckedCreateWithoutProducedMoviesInput> | PersonCreateWithoutProducedMoviesInput[] | PersonUncheckedCreateWithoutProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutProducedMoviesInput | PersonCreateOrConnectWithoutProducedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput = {
    create?: XOR<PersonCreateWithoutExecProducedMoviesInput, PersonUncheckedCreateWithoutExecProducedMoviesInput> | PersonCreateWithoutExecProducedMoviesInput[] | PersonUncheckedCreateWithoutExecProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutExecProducedMoviesInput | PersonCreateOrConnectWithoutExecProducedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput = {
    create?: XOR<PersonCreateWithoutWrittenMoviesInput, PersonUncheckedCreateWithoutWrittenMoviesInput> | PersonCreateWithoutWrittenMoviesInput[] | PersonUncheckedCreateWithoutWrittenMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutWrittenMoviesInput | PersonCreateOrConnectWithoutWrittenMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutComposedMoviesInput = {
    create?: XOR<PersonCreateWithoutComposedMoviesInput, PersonUncheckedCreateWithoutComposedMoviesInput> | PersonCreateWithoutComposedMoviesInput[] | PersonUncheckedCreateWithoutComposedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutComposedMoviesInput | PersonCreateOrConnectWithoutComposedMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput = {
    create?: XOR<PersonCreateWithoutCinematographyMoviesInput, PersonUncheckedCreateWithoutCinematographyMoviesInput> | PersonCreateWithoutCinematographyMoviesInput[] | PersonUncheckedCreateWithoutCinematographyMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutCinematographyMoviesInput | PersonCreateOrConnectWithoutCinematographyMoviesInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MovieGenreUpdateManyWithoutMoviesNestedInput = {
    create?: XOR<MovieGenreCreateWithoutMoviesInput, MovieGenreUncheckedCreateWithoutMoviesInput> | MovieGenreCreateWithoutMoviesInput[] | MovieGenreUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMoviesInput | MovieGenreCreateOrConnectWithoutMoviesInput[]
    upsert?: MovieGenreUpsertWithWhereUniqueWithoutMoviesInput | MovieGenreUpsertWithWhereUniqueWithoutMoviesInput[]
    set?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    disconnect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    delete?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    update?: MovieGenreUpdateWithWhereUniqueWithoutMoviesInput | MovieGenreUpdateWithWhereUniqueWithoutMoviesInput[]
    updateMany?: MovieGenreUpdateManyWithWhereWithoutMoviesInput | MovieGenreUpdateManyWithWhereWithoutMoviesInput[]
    deleteMany?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
  }

  export type ProductionCompanyUpdateManyWithoutMoviesNestedInput = {
    create?: XOR<ProductionCompanyCreateWithoutMoviesInput, ProductionCompanyUncheckedCreateWithoutMoviesInput> | ProductionCompanyCreateWithoutMoviesInput[] | ProductionCompanyUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ProductionCompanyCreateOrConnectWithoutMoviesInput | ProductionCompanyCreateOrConnectWithoutMoviesInput[]
    upsert?: ProductionCompanyUpsertWithWhereUniqueWithoutMoviesInput | ProductionCompanyUpsertWithWhereUniqueWithoutMoviesInput[]
    set?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    disconnect?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    delete?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    connect?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    update?: ProductionCompanyUpdateWithWhereUniqueWithoutMoviesInput | ProductionCompanyUpdateWithWhereUniqueWithoutMoviesInput[]
    updateMany?: ProductionCompanyUpdateManyWithWhereWithoutMoviesInput | ProductionCompanyUpdateManyWithWhereWithoutMoviesInput[]
    deleteMany?: ProductionCompanyScalarWhereInput | ProductionCompanyScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutMovieNestedInput = {
    create?: XOR<ReviewCreateWithoutMovieInput, ReviewUncheckedCreateWithoutMovieInput> | ReviewCreateWithoutMovieInput[] | ReviewUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMovieInput | ReviewCreateOrConnectWithoutMovieInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMovieInput | ReviewUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: ReviewCreateManyMovieInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMovieInput | ReviewUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMovieInput | ReviewUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type WatchedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<WatchedCreateWithoutMovieInput, WatchedUncheckedCreateWithoutMovieInput> | WatchedCreateWithoutMovieInput[] | WatchedUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutMovieInput | WatchedCreateOrConnectWithoutMovieInput[]
    upsert?: WatchedUpsertWithWhereUniqueWithoutMovieInput | WatchedUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: WatchedCreateManyMovieInputEnvelope
    set?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    disconnect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    delete?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    update?: WatchedUpdateWithWhereUniqueWithoutMovieInput | WatchedUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: WatchedUpdateManyWithWhereWithoutMovieInput | WatchedUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
  }

  export type WatchlistUpdateManyWithoutMovieNestedInput = {
    create?: XOR<WatchlistCreateWithoutMovieInput, WatchlistUncheckedCreateWithoutMovieInput> | WatchlistCreateWithoutMovieInput[] | WatchlistUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutMovieInput | WatchlistCreateOrConnectWithoutMovieInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutMovieInput | WatchlistUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: WatchlistCreateManyMovieInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutMovieInput | WatchlistUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutMovieInput | WatchlistUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type ListUpdateManyWithoutMoviesNestedInput = {
    create?: XOR<ListCreateWithoutMoviesInput, ListUncheckedCreateWithoutMoviesInput> | ListCreateWithoutMoviesInput[] | ListUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ListCreateOrConnectWithoutMoviesInput | ListCreateOrConnectWithoutMoviesInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutMoviesInput | ListUpsertWithWhereUniqueWithoutMoviesInput[]
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutMoviesInput | ListUpdateWithWhereUniqueWithoutMoviesInput[]
    updateMany?: ListUpdateManyWithWhereWithoutMoviesInput | ListUpdateManyWithWhereWithoutMoviesInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutDirectedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutDirectedMoviesInput, PersonUncheckedCreateWithoutDirectedMoviesInput> | PersonCreateWithoutDirectedMoviesInput[] | PersonUncheckedCreateWithoutDirectedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutDirectedMoviesInput | PersonCreateOrConnectWithoutDirectedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutDirectedMoviesInput | PersonUpsertWithWhereUniqueWithoutDirectedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutDirectedMoviesInput | PersonUpdateWithWhereUniqueWithoutDirectedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutDirectedMoviesInput | PersonUpdateManyWithWhereWithoutDirectedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutProducedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutProducedMoviesInput, PersonUncheckedCreateWithoutProducedMoviesInput> | PersonCreateWithoutProducedMoviesInput[] | PersonUncheckedCreateWithoutProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutProducedMoviesInput | PersonCreateOrConnectWithoutProducedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutProducedMoviesInput | PersonUpsertWithWhereUniqueWithoutProducedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutProducedMoviesInput | PersonUpdateWithWhereUniqueWithoutProducedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutProducedMoviesInput | PersonUpdateManyWithWhereWithoutProducedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutExecProducedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutExecProducedMoviesInput, PersonUncheckedCreateWithoutExecProducedMoviesInput> | PersonCreateWithoutExecProducedMoviesInput[] | PersonUncheckedCreateWithoutExecProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutExecProducedMoviesInput | PersonCreateOrConnectWithoutExecProducedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutExecProducedMoviesInput | PersonUpsertWithWhereUniqueWithoutExecProducedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutExecProducedMoviesInput | PersonUpdateWithWhereUniqueWithoutExecProducedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutExecProducedMoviesInput | PersonUpdateManyWithWhereWithoutExecProducedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutWrittenMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutWrittenMoviesInput, PersonUncheckedCreateWithoutWrittenMoviesInput> | PersonCreateWithoutWrittenMoviesInput[] | PersonUncheckedCreateWithoutWrittenMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutWrittenMoviesInput | PersonCreateOrConnectWithoutWrittenMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutWrittenMoviesInput | PersonUpsertWithWhereUniqueWithoutWrittenMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutWrittenMoviesInput | PersonUpdateWithWhereUniqueWithoutWrittenMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutWrittenMoviesInput | PersonUpdateManyWithWhereWithoutWrittenMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutComposedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutComposedMoviesInput, PersonUncheckedCreateWithoutComposedMoviesInput> | PersonCreateWithoutComposedMoviesInput[] | PersonUncheckedCreateWithoutComposedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutComposedMoviesInput | PersonCreateOrConnectWithoutComposedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutComposedMoviesInput | PersonUpsertWithWhereUniqueWithoutComposedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutComposedMoviesInput | PersonUpdateWithWhereUniqueWithoutComposedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutComposedMoviesInput | PersonUpdateManyWithWhereWithoutComposedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutCinematographyMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutCinematographyMoviesInput, PersonUncheckedCreateWithoutCinematographyMoviesInput> | PersonCreateWithoutCinematographyMoviesInput[] | PersonUncheckedCreateWithoutCinematographyMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutCinematographyMoviesInput | PersonCreateOrConnectWithoutCinematographyMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutCinematographyMoviesInput | PersonUpsertWithWhereUniqueWithoutCinematographyMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutCinematographyMoviesInput | PersonUpdateWithWhereUniqueWithoutCinematographyMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutCinematographyMoviesInput | PersonUpdateManyWithWhereWithoutCinematographyMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput = {
    create?: XOR<MovieGenreCreateWithoutMoviesInput, MovieGenreUncheckedCreateWithoutMoviesInput> | MovieGenreCreateWithoutMoviesInput[] | MovieGenreUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMoviesInput | MovieGenreCreateOrConnectWithoutMoviesInput[]
    upsert?: MovieGenreUpsertWithWhereUniqueWithoutMoviesInput | MovieGenreUpsertWithWhereUniqueWithoutMoviesInput[]
    set?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    disconnect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    delete?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    update?: MovieGenreUpdateWithWhereUniqueWithoutMoviesInput | MovieGenreUpdateWithWhereUniqueWithoutMoviesInput[]
    updateMany?: MovieGenreUpdateManyWithWhereWithoutMoviesInput | MovieGenreUpdateManyWithWhereWithoutMoviesInput[]
    deleteMany?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
  }

  export type ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput = {
    create?: XOR<ProductionCompanyCreateWithoutMoviesInput, ProductionCompanyUncheckedCreateWithoutMoviesInput> | ProductionCompanyCreateWithoutMoviesInput[] | ProductionCompanyUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ProductionCompanyCreateOrConnectWithoutMoviesInput | ProductionCompanyCreateOrConnectWithoutMoviesInput[]
    upsert?: ProductionCompanyUpsertWithWhereUniqueWithoutMoviesInput | ProductionCompanyUpsertWithWhereUniqueWithoutMoviesInput[]
    set?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    disconnect?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    delete?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    connect?: ProductionCompanyWhereUniqueInput | ProductionCompanyWhereUniqueInput[]
    update?: ProductionCompanyUpdateWithWhereUniqueWithoutMoviesInput | ProductionCompanyUpdateWithWhereUniqueWithoutMoviesInput[]
    updateMany?: ProductionCompanyUpdateManyWithWhereWithoutMoviesInput | ProductionCompanyUpdateManyWithWhereWithoutMoviesInput[]
    deleteMany?: ProductionCompanyScalarWhereInput | ProductionCompanyScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<ReviewCreateWithoutMovieInput, ReviewUncheckedCreateWithoutMovieInput> | ReviewCreateWithoutMovieInput[] | ReviewUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutMovieInput | ReviewCreateOrConnectWithoutMovieInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutMovieInput | ReviewUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: ReviewCreateManyMovieInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutMovieInput | ReviewUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutMovieInput | ReviewUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type WatchedUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<WatchedCreateWithoutMovieInput, WatchedUncheckedCreateWithoutMovieInput> | WatchedCreateWithoutMovieInput[] | WatchedUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutMovieInput | WatchedCreateOrConnectWithoutMovieInput[]
    upsert?: WatchedUpsertWithWhereUniqueWithoutMovieInput | WatchedUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: WatchedCreateManyMovieInputEnvelope
    set?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    disconnect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    delete?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    update?: WatchedUpdateWithWhereUniqueWithoutMovieInput | WatchedUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: WatchedUpdateManyWithWhereWithoutMovieInput | WatchedUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
  }

  export type WatchlistUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<WatchlistCreateWithoutMovieInput, WatchlistUncheckedCreateWithoutMovieInput> | WatchlistCreateWithoutMovieInput[] | WatchlistUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutMovieInput | WatchlistCreateOrConnectWithoutMovieInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutMovieInput | WatchlistUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: WatchlistCreateManyMovieInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutMovieInput | WatchlistUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutMovieInput | WatchlistUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type ListUncheckedUpdateManyWithoutMoviesNestedInput = {
    create?: XOR<ListCreateWithoutMoviesInput, ListUncheckedCreateWithoutMoviesInput> | ListCreateWithoutMoviesInput[] | ListUncheckedCreateWithoutMoviesInput[]
    connectOrCreate?: ListCreateOrConnectWithoutMoviesInput | ListCreateOrConnectWithoutMoviesInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutMoviesInput | ListUpsertWithWhereUniqueWithoutMoviesInput[]
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutMoviesInput | ListUpdateWithWhereUniqueWithoutMoviesInput[]
    updateMany?: ListUpdateManyWithWhereWithoutMoviesInput | ListUpdateManyWithWhereWithoutMoviesInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutDirectedMoviesInput, PersonUncheckedCreateWithoutDirectedMoviesInput> | PersonCreateWithoutDirectedMoviesInput[] | PersonUncheckedCreateWithoutDirectedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutDirectedMoviesInput | PersonCreateOrConnectWithoutDirectedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutDirectedMoviesInput | PersonUpsertWithWhereUniqueWithoutDirectedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutDirectedMoviesInput | PersonUpdateWithWhereUniqueWithoutDirectedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutDirectedMoviesInput | PersonUpdateManyWithWhereWithoutDirectedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutProducedMoviesInput, PersonUncheckedCreateWithoutProducedMoviesInput> | PersonCreateWithoutProducedMoviesInput[] | PersonUncheckedCreateWithoutProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutProducedMoviesInput | PersonCreateOrConnectWithoutProducedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutProducedMoviesInput | PersonUpsertWithWhereUniqueWithoutProducedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutProducedMoviesInput | PersonUpdateWithWhereUniqueWithoutProducedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutProducedMoviesInput | PersonUpdateManyWithWhereWithoutProducedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutExecProducedMoviesInput, PersonUncheckedCreateWithoutExecProducedMoviesInput> | PersonCreateWithoutExecProducedMoviesInput[] | PersonUncheckedCreateWithoutExecProducedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutExecProducedMoviesInput | PersonCreateOrConnectWithoutExecProducedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutExecProducedMoviesInput | PersonUpsertWithWhereUniqueWithoutExecProducedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutExecProducedMoviesInput | PersonUpdateWithWhereUniqueWithoutExecProducedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutExecProducedMoviesInput | PersonUpdateManyWithWhereWithoutExecProducedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutWrittenMoviesInput, PersonUncheckedCreateWithoutWrittenMoviesInput> | PersonCreateWithoutWrittenMoviesInput[] | PersonUncheckedCreateWithoutWrittenMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutWrittenMoviesInput | PersonCreateOrConnectWithoutWrittenMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutWrittenMoviesInput | PersonUpsertWithWhereUniqueWithoutWrittenMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutWrittenMoviesInput | PersonUpdateWithWhereUniqueWithoutWrittenMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutWrittenMoviesInput | PersonUpdateManyWithWhereWithoutWrittenMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutComposedMoviesInput, PersonUncheckedCreateWithoutComposedMoviesInput> | PersonCreateWithoutComposedMoviesInput[] | PersonUncheckedCreateWithoutComposedMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutComposedMoviesInput | PersonCreateOrConnectWithoutComposedMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutComposedMoviesInput | PersonUpsertWithWhereUniqueWithoutComposedMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutComposedMoviesInput | PersonUpdateWithWhereUniqueWithoutComposedMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutComposedMoviesInput | PersonUpdateManyWithWhereWithoutComposedMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput = {
    create?: XOR<PersonCreateWithoutCinematographyMoviesInput, PersonUncheckedCreateWithoutCinematographyMoviesInput> | PersonCreateWithoutCinematographyMoviesInput[] | PersonUncheckedCreateWithoutCinematographyMoviesInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutCinematographyMoviesInput | PersonCreateOrConnectWithoutCinematographyMoviesInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutCinematographyMoviesInput | PersonUpsertWithWhereUniqueWithoutCinematographyMoviesInput[]
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutCinematographyMoviesInput | PersonUpdateWithWhereUniqueWithoutCinematographyMoviesInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutCinematographyMoviesInput | PersonUpdateManyWithWhereWithoutCinematographyMoviesInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type MovieCreateNestedManyWithoutGenresInput = {
    create?: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput> | MovieCreateWithoutGenresInput[] | MovieUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutGenresInput | MovieCreateOrConnectWithoutGenresInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutGenresInput = {
    create?: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput> | MovieCreateWithoutGenresInput[] | MovieUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutGenresInput | MovieCreateOrConnectWithoutGenresInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUpdateManyWithoutGenresNestedInput = {
    create?: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput> | MovieCreateWithoutGenresInput[] | MovieUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutGenresInput | MovieCreateOrConnectWithoutGenresInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutGenresInput | MovieUpsertWithWhereUniqueWithoutGenresInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutGenresInput | MovieUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutGenresInput | MovieUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutGenresNestedInput = {
    create?: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput> | MovieCreateWithoutGenresInput[] | MovieUncheckedCreateWithoutGenresInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutGenresInput | MovieCreateOrConnectWithoutGenresInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutGenresInput | MovieUpsertWithWhereUniqueWithoutGenresInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutGenresInput | MovieUpdateWithWhereUniqueWithoutGenresInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutGenresInput | MovieUpdateManyWithWhereWithoutGenresInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieCreateNestedManyWithoutProductionCompaniesInput = {
    create?: XOR<MovieCreateWithoutProductionCompaniesInput, MovieUncheckedCreateWithoutProductionCompaniesInput> | MovieCreateWithoutProductionCompaniesInput[] | MovieUncheckedCreateWithoutProductionCompaniesInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProductionCompaniesInput | MovieCreateOrConnectWithoutProductionCompaniesInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutProductionCompaniesInput = {
    create?: XOR<MovieCreateWithoutProductionCompaniesInput, MovieUncheckedCreateWithoutProductionCompaniesInput> | MovieCreateWithoutProductionCompaniesInput[] | MovieUncheckedCreateWithoutProductionCompaniesInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProductionCompaniesInput | MovieCreateOrConnectWithoutProductionCompaniesInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type MovieUpdateManyWithoutProductionCompaniesNestedInput = {
    create?: XOR<MovieCreateWithoutProductionCompaniesInput, MovieUncheckedCreateWithoutProductionCompaniesInput> | MovieCreateWithoutProductionCompaniesInput[] | MovieUncheckedCreateWithoutProductionCompaniesInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProductionCompaniesInput | MovieCreateOrConnectWithoutProductionCompaniesInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutProductionCompaniesInput | MovieUpsertWithWhereUniqueWithoutProductionCompaniesInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutProductionCompaniesInput | MovieUpdateWithWhereUniqueWithoutProductionCompaniesInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutProductionCompaniesInput | MovieUpdateManyWithWhereWithoutProductionCompaniesInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutProductionCompaniesNestedInput = {
    create?: XOR<MovieCreateWithoutProductionCompaniesInput, MovieUncheckedCreateWithoutProductionCompaniesInput> | MovieCreateWithoutProductionCompaniesInput[] | MovieUncheckedCreateWithoutProductionCompaniesInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutProductionCompaniesInput | MovieCreateOrConnectWithoutProductionCompaniesInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutProductionCompaniesInput | MovieUpsertWithWhereUniqueWithoutProductionCompaniesInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutProductionCompaniesInput | MovieUpdateWithWhereUniqueWithoutProductionCompaniesInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutProductionCompaniesInput | MovieUpdateManyWithWhereWithoutProductionCompaniesInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type ReviewCreateNestedManyWithoutTVShowInput = {
    create?: XOR<ReviewCreateWithoutTVShowInput, ReviewUncheckedCreateWithoutTVShowInput> | ReviewCreateWithoutTVShowInput[] | ReviewUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTVShowInput | ReviewCreateOrConnectWithoutTVShowInput[]
    createMany?: ReviewCreateManyTVShowInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type WatchedCreateNestedManyWithoutTVShowInput = {
    create?: XOR<WatchedCreateWithoutTVShowInput, WatchedUncheckedCreateWithoutTVShowInput> | WatchedCreateWithoutTVShowInput[] | WatchedUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutTVShowInput | WatchedCreateOrConnectWithoutTVShowInput[]
    createMany?: WatchedCreateManyTVShowInputEnvelope
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
  }

  export type WatchlistCreateNestedManyWithoutTVShowInput = {
    create?: XOR<WatchlistCreateWithoutTVShowInput, WatchlistUncheckedCreateWithoutTVShowInput> | WatchlistCreateWithoutTVShowInput[] | WatchlistUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutTVShowInput | WatchlistCreateOrConnectWithoutTVShowInput[]
    createMany?: WatchlistCreateManyTVShowInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type ListCreateNestedManyWithoutTVShowsInput = {
    create?: XOR<ListCreateWithoutTVShowsInput, ListUncheckedCreateWithoutTVShowsInput> | ListCreateWithoutTVShowsInput[] | ListUncheckedCreateWithoutTVShowsInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTVShowsInput | ListCreateOrConnectWithoutTVShowsInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutTVShowInput = {
    create?: XOR<ReviewCreateWithoutTVShowInput, ReviewUncheckedCreateWithoutTVShowInput> | ReviewCreateWithoutTVShowInput[] | ReviewUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTVShowInput | ReviewCreateOrConnectWithoutTVShowInput[]
    createMany?: ReviewCreateManyTVShowInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type WatchedUncheckedCreateNestedManyWithoutTVShowInput = {
    create?: XOR<WatchedCreateWithoutTVShowInput, WatchedUncheckedCreateWithoutTVShowInput> | WatchedCreateWithoutTVShowInput[] | WatchedUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutTVShowInput | WatchedCreateOrConnectWithoutTVShowInput[]
    createMany?: WatchedCreateManyTVShowInputEnvelope
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
  }

  export type WatchlistUncheckedCreateNestedManyWithoutTVShowInput = {
    create?: XOR<WatchlistCreateWithoutTVShowInput, WatchlistUncheckedCreateWithoutTVShowInput> | WatchlistCreateWithoutTVShowInput[] | WatchlistUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutTVShowInput | WatchlistCreateOrConnectWithoutTVShowInput[]
    createMany?: WatchlistCreateManyTVShowInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type ListUncheckedCreateNestedManyWithoutTVShowsInput = {
    create?: XOR<ListCreateWithoutTVShowsInput, ListUncheckedCreateWithoutTVShowsInput> | ListCreateWithoutTVShowsInput[] | ListUncheckedCreateWithoutTVShowsInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTVShowsInput | ListCreateOrConnectWithoutTVShowsInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type ReviewUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<ReviewCreateWithoutTVShowInput, ReviewUncheckedCreateWithoutTVShowInput> | ReviewCreateWithoutTVShowInput[] | ReviewUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTVShowInput | ReviewCreateOrConnectWithoutTVShowInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTVShowInput | ReviewUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: ReviewCreateManyTVShowInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTVShowInput | ReviewUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTVShowInput | ReviewUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type WatchedUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<WatchedCreateWithoutTVShowInput, WatchedUncheckedCreateWithoutTVShowInput> | WatchedCreateWithoutTVShowInput[] | WatchedUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutTVShowInput | WatchedCreateOrConnectWithoutTVShowInput[]
    upsert?: WatchedUpsertWithWhereUniqueWithoutTVShowInput | WatchedUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: WatchedCreateManyTVShowInputEnvelope
    set?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    disconnect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    delete?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    update?: WatchedUpdateWithWhereUniqueWithoutTVShowInput | WatchedUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: WatchedUpdateManyWithWhereWithoutTVShowInput | WatchedUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
  }

  export type WatchlistUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<WatchlistCreateWithoutTVShowInput, WatchlistUncheckedCreateWithoutTVShowInput> | WatchlistCreateWithoutTVShowInput[] | WatchlistUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutTVShowInput | WatchlistCreateOrConnectWithoutTVShowInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutTVShowInput | WatchlistUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: WatchlistCreateManyTVShowInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutTVShowInput | WatchlistUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutTVShowInput | WatchlistUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type ListUpdateManyWithoutTVShowsNestedInput = {
    create?: XOR<ListCreateWithoutTVShowsInput, ListUncheckedCreateWithoutTVShowsInput> | ListCreateWithoutTVShowsInput[] | ListUncheckedCreateWithoutTVShowsInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTVShowsInput | ListCreateOrConnectWithoutTVShowsInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutTVShowsInput | ListUpsertWithWhereUniqueWithoutTVShowsInput[]
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutTVShowsInput | ListUpdateWithWhereUniqueWithoutTVShowsInput[]
    updateMany?: ListUpdateManyWithWhereWithoutTVShowsInput | ListUpdateManyWithWhereWithoutTVShowsInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<ReviewCreateWithoutTVShowInput, ReviewUncheckedCreateWithoutTVShowInput> | ReviewCreateWithoutTVShowInput[] | ReviewUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTVShowInput | ReviewCreateOrConnectWithoutTVShowInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTVShowInput | ReviewUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: ReviewCreateManyTVShowInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTVShowInput | ReviewUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTVShowInput | ReviewUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type WatchedUncheckedUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<WatchedCreateWithoutTVShowInput, WatchedUncheckedCreateWithoutTVShowInput> | WatchedCreateWithoutTVShowInput[] | WatchedUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchedCreateOrConnectWithoutTVShowInput | WatchedCreateOrConnectWithoutTVShowInput[]
    upsert?: WatchedUpsertWithWhereUniqueWithoutTVShowInput | WatchedUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: WatchedCreateManyTVShowInputEnvelope
    set?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    disconnect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    delete?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    connect?: WatchedWhereUniqueInput | WatchedWhereUniqueInput[]
    update?: WatchedUpdateWithWhereUniqueWithoutTVShowInput | WatchedUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: WatchedUpdateManyWithWhereWithoutTVShowInput | WatchedUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
  }

  export type WatchlistUncheckedUpdateManyWithoutTVShowNestedInput = {
    create?: XOR<WatchlistCreateWithoutTVShowInput, WatchlistUncheckedCreateWithoutTVShowInput> | WatchlistCreateWithoutTVShowInput[] | WatchlistUncheckedCreateWithoutTVShowInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutTVShowInput | WatchlistCreateOrConnectWithoutTVShowInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutTVShowInput | WatchlistUpsertWithWhereUniqueWithoutTVShowInput[]
    createMany?: WatchlistCreateManyTVShowInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutTVShowInput | WatchlistUpdateWithWhereUniqueWithoutTVShowInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutTVShowInput | WatchlistUpdateManyWithWhereWithoutTVShowInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type ListUncheckedUpdateManyWithoutTVShowsNestedInput = {
    create?: XOR<ListCreateWithoutTVShowsInput, ListUncheckedCreateWithoutTVShowsInput> | ListCreateWithoutTVShowsInput[] | ListUncheckedCreateWithoutTVShowsInput[]
    connectOrCreate?: ListCreateOrConnectWithoutTVShowsInput | ListCreateOrConnectWithoutTVShowsInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutTVShowsInput | ListUpsertWithWhereUniqueWithoutTVShowsInput[]
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutTVShowsInput | ListUpdateWithWhereUniqueWithoutTVShowsInput[]
    updateMany?: ListUpdateManyWithWhereWithoutTVShowsInput | ListUpdateManyWithWhereWithoutTVShowsInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type TVShowCreateNestedOneWithoutReviewsInput = {
    create?: XOR<TVShowCreateWithoutReviewsInput, TVShowUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutReviewsInput
    connect?: TVShowWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutReviewsInput = {
    create?: XOR<MovieCreateWithoutReviewsInput, MovieUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutReviewsInput
    connect?: MovieWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumShowTypeFieldUpdateOperationsInput = {
    set?: $Enums.ShowType
  }

  export type TVShowUpdateOneWithoutReviewsNestedInput = {
    create?: XOR<TVShowCreateWithoutReviewsInput, TVShowUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutReviewsInput
    upsert?: TVShowUpsertWithoutReviewsInput
    disconnect?: TVShowWhereInput | boolean
    delete?: TVShowWhereInput | boolean
    connect?: TVShowWhereUniqueInput
    update?: XOR<XOR<TVShowUpdateToOneWithWhereWithoutReviewsInput, TVShowUpdateWithoutReviewsInput>, TVShowUncheckedUpdateWithoutReviewsInput>
  }

  export type MovieUpdateOneWithoutReviewsNestedInput = {
    create?: XOR<MovieCreateWithoutReviewsInput, MovieUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutReviewsInput
    upsert?: MovieUpsertWithoutReviewsInput
    disconnect?: MovieWhereInput | boolean
    delete?: MovieWhereInput | boolean
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutReviewsInput, MovieUpdateWithoutReviewsInput>, MovieUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type TVShowCreateNestedOneWithoutWatchedInput = {
    create?: XOR<TVShowCreateWithoutWatchedInput, TVShowUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutWatchedInput
    connect?: TVShowWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutWatchedInput = {
    create?: XOR<MovieCreateWithoutWatchedInput, MovieUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWatchedInput
    connect?: MovieWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWatchedInput = {
    create?: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchedInput
    connect?: UserWhereUniqueInput
  }

  export type TVShowUpdateOneWithoutWatchedNestedInput = {
    create?: XOR<TVShowCreateWithoutWatchedInput, TVShowUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutWatchedInput
    upsert?: TVShowUpsertWithoutWatchedInput
    disconnect?: TVShowWhereInput | boolean
    delete?: TVShowWhereInput | boolean
    connect?: TVShowWhereUniqueInput
    update?: XOR<XOR<TVShowUpdateToOneWithWhereWithoutWatchedInput, TVShowUpdateWithoutWatchedInput>, TVShowUncheckedUpdateWithoutWatchedInput>
  }

  export type MovieUpdateOneWithoutWatchedNestedInput = {
    create?: XOR<MovieCreateWithoutWatchedInput, MovieUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWatchedInput
    upsert?: MovieUpsertWithoutWatchedInput
    disconnect?: MovieWhereInput | boolean
    delete?: MovieWhereInput | boolean
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutWatchedInput, MovieUpdateWithoutWatchedInput>, MovieUncheckedUpdateWithoutWatchedInput>
  }

  export type UserUpdateOneRequiredWithoutWatchedNestedInput = {
    create?: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchedInput
    upsert?: UserUpsertWithoutWatchedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchedInput, UserUpdateWithoutWatchedInput>, UserUncheckedUpdateWithoutWatchedInput>
  }

  export type TVShowCreateNestedOneWithoutWatchlistsInput = {
    create?: XOR<TVShowCreateWithoutWatchlistsInput, TVShowUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutWatchlistsInput
    connect?: TVShowWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutWatchlistsInput = {
    create?: XOR<MovieCreateWithoutWatchlistsInput, MovieUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWatchlistsInput
    connect?: MovieWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWatchlistsInput = {
    create?: XOR<UserCreateWithoutWatchlistsInput, UserUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistsInput
    connect?: UserWhereUniqueInput
  }

  export type TVShowUpdateOneWithoutWatchlistsNestedInput = {
    create?: XOR<TVShowCreateWithoutWatchlistsInput, TVShowUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: TVShowCreateOrConnectWithoutWatchlistsInput
    upsert?: TVShowUpsertWithoutWatchlistsInput
    disconnect?: TVShowWhereInput | boolean
    delete?: TVShowWhereInput | boolean
    connect?: TVShowWhereUniqueInput
    update?: XOR<XOR<TVShowUpdateToOneWithWhereWithoutWatchlistsInput, TVShowUpdateWithoutWatchlistsInput>, TVShowUncheckedUpdateWithoutWatchlistsInput>
  }

  export type MovieUpdateOneWithoutWatchlistsNestedInput = {
    create?: XOR<MovieCreateWithoutWatchlistsInput, MovieUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutWatchlistsInput
    upsert?: MovieUpsertWithoutWatchlistsInput
    disconnect?: MovieWhereInput | boolean
    delete?: MovieWhereInput | boolean
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutWatchlistsInput, MovieUpdateWithoutWatchlistsInput>, MovieUncheckedUpdateWithoutWatchlistsInput>
  }

  export type UserUpdateOneRequiredWithoutWatchlistsNestedInput = {
    create?: XOR<UserCreateWithoutWatchlistsInput, UserUncheckedCreateWithoutWatchlistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistsInput
    upsert?: UserUpsertWithoutWatchlistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchlistsInput, UserUpdateWithoutWatchlistsInput>, UserUncheckedUpdateWithoutWatchlistsInput>
  }

  export type UserCreateNestedOneWithoutListsInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    connect?: UserWhereUniqueInput
  }

  export type MovieCreateNestedManyWithoutListsInput = {
    create?: XOR<MovieCreateWithoutListsInput, MovieUncheckedCreateWithoutListsInput> | MovieCreateWithoutListsInput[] | MovieUncheckedCreateWithoutListsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutListsInput | MovieCreateOrConnectWithoutListsInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type TVShowCreateNestedManyWithoutListsInput = {
    create?: XOR<TVShowCreateWithoutListsInput, TVShowUncheckedCreateWithoutListsInput> | TVShowCreateWithoutListsInput[] | TVShowUncheckedCreateWithoutListsInput[]
    connectOrCreate?: TVShowCreateOrConnectWithoutListsInput | TVShowCreateOrConnectWithoutListsInput[]
    connect?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
  }

  export type MovieUncheckedCreateNestedManyWithoutListsInput = {
    create?: XOR<MovieCreateWithoutListsInput, MovieUncheckedCreateWithoutListsInput> | MovieCreateWithoutListsInput[] | MovieUncheckedCreateWithoutListsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutListsInput | MovieCreateOrConnectWithoutListsInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
  }

  export type TVShowUncheckedCreateNestedManyWithoutListsInput = {
    create?: XOR<TVShowCreateWithoutListsInput, TVShowUncheckedCreateWithoutListsInput> | TVShowCreateWithoutListsInput[] | TVShowUncheckedCreateWithoutListsInput[]
    connectOrCreate?: TVShowCreateOrConnectWithoutListsInput | TVShowCreateOrConnectWithoutListsInput[]
    connect?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutListsNestedInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    upsert?: UserUpsertWithoutListsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListsInput, UserUpdateWithoutListsInput>, UserUncheckedUpdateWithoutListsInput>
  }

  export type MovieUpdateManyWithoutListsNestedInput = {
    create?: XOR<MovieCreateWithoutListsInput, MovieUncheckedCreateWithoutListsInput> | MovieCreateWithoutListsInput[] | MovieUncheckedCreateWithoutListsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutListsInput | MovieCreateOrConnectWithoutListsInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutListsInput | MovieUpsertWithWhereUniqueWithoutListsInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutListsInput | MovieUpdateWithWhereUniqueWithoutListsInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutListsInput | MovieUpdateManyWithWhereWithoutListsInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type TVShowUpdateManyWithoutListsNestedInput = {
    create?: XOR<TVShowCreateWithoutListsInput, TVShowUncheckedCreateWithoutListsInput> | TVShowCreateWithoutListsInput[] | TVShowUncheckedCreateWithoutListsInput[]
    connectOrCreate?: TVShowCreateOrConnectWithoutListsInput | TVShowCreateOrConnectWithoutListsInput[]
    upsert?: TVShowUpsertWithWhereUniqueWithoutListsInput | TVShowUpsertWithWhereUniqueWithoutListsInput[]
    set?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    disconnect?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    delete?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    connect?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    update?: TVShowUpdateWithWhereUniqueWithoutListsInput | TVShowUpdateWithWhereUniqueWithoutListsInput[]
    updateMany?: TVShowUpdateManyWithWhereWithoutListsInput | TVShowUpdateManyWithWhereWithoutListsInput[]
    deleteMany?: TVShowScalarWhereInput | TVShowScalarWhereInput[]
  }

  export type MovieUncheckedUpdateManyWithoutListsNestedInput = {
    create?: XOR<MovieCreateWithoutListsInput, MovieUncheckedCreateWithoutListsInput> | MovieCreateWithoutListsInput[] | MovieUncheckedCreateWithoutListsInput[]
    connectOrCreate?: MovieCreateOrConnectWithoutListsInput | MovieCreateOrConnectWithoutListsInput[]
    upsert?: MovieUpsertWithWhereUniqueWithoutListsInput | MovieUpsertWithWhereUniqueWithoutListsInput[]
    set?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    disconnect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    delete?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    connect?: MovieWhereUniqueInput | MovieWhereUniqueInput[]
    update?: MovieUpdateWithWhereUniqueWithoutListsInput | MovieUpdateWithWhereUniqueWithoutListsInput[]
    updateMany?: MovieUpdateManyWithWhereWithoutListsInput | MovieUpdateManyWithWhereWithoutListsInput[]
    deleteMany?: MovieScalarWhereInput | MovieScalarWhereInput[]
  }

  export type TVShowUncheckedUpdateManyWithoutListsNestedInput = {
    create?: XOR<TVShowCreateWithoutListsInput, TVShowUncheckedCreateWithoutListsInput> | TVShowCreateWithoutListsInput[] | TVShowUncheckedCreateWithoutListsInput[]
    connectOrCreate?: TVShowCreateOrConnectWithoutListsInput | TVShowCreateOrConnectWithoutListsInput[]
    upsert?: TVShowUpsertWithWhereUniqueWithoutListsInput | TVShowUpsertWithWhereUniqueWithoutListsInput[]
    set?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    disconnect?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    delete?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    connect?: TVShowWhereUniqueInput | TVShowWhereUniqueInput[]
    update?: TVShowUpdateWithWhereUniqueWithoutListsInput | TVShowUpdateWithWhereUniqueWithoutListsInput[]
    updateMany?: TVShowUpdateManyWithWhereWithoutListsInput | TVShowUpdateManyWithWhereWithoutListsInput[]
    deleteMany?: TVShowScalarWhereInput | TVShowScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumShowTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ShowType | EnumShowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumShowTypeFilter<$PrismaModel> | $Enums.ShowType
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumShowTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShowType | EnumShowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShowType[] | ListEnumShowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumShowTypeWithAggregatesFilter<$PrismaModel> | $Enums.ShowType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShowTypeFilter<$PrismaModel>
    _max?: NestedEnumShowTypeFilter<$PrismaModel>
  }

  export type ListCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    movies?: MovieCreateNestedManyWithoutListsInput
    TVShows?: TVShowCreateNestedManyWithoutListsInput
  }

  export type ListUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    movies?: MovieUncheckedCreateNestedManyWithoutListsInput
    TVShows?: TVShowUncheckedCreateNestedManyWithoutListsInput
  }

  export type ListCreateOrConnectWithoutUserInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListCreateManyUserInputEnvelope = {
    data: ListCreateManyUserInput | ListCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutUserInput = {
    id?: string
    rating: number
    comment?: string | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutReviewsInput
    movie?: MovieCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string
    rating: number
    comment?: string | null
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchedCreateWithoutUserInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutWatchedInput
    movie?: MovieCreateNestedOneWithoutWatchedInput
  }

  export type WatchedUncheckedCreateWithoutUserInput = {
    id?: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedCreateOrConnectWithoutUserInput = {
    where: WatchedWhereUniqueInput
    create: XOR<WatchedCreateWithoutUserInput, WatchedUncheckedCreateWithoutUserInput>
  }

  export type WatchedCreateManyUserInputEnvelope = {
    data: WatchedCreateManyUserInput | WatchedCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistCreateWithoutUserInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutWatchlistsInput
    movie?: MovieCreateNestedOneWithoutWatchlistsInput
  }

  export type WatchlistUncheckedCreateWithoutUserInput = {
    id?: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateOrConnectWithoutUserInput = {
    where: WatchlistWhereUniqueInput
    create: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput>
  }

  export type WatchlistCreateManyUserInputEnvelope = {
    data: WatchlistCreateManyUserInput | WatchlistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ListUpsertWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListUpdateWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
  }

  export type ListUpdateManyWithWhereWithoutUserInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutUserInput>
  }

  export type ListScalarWhereInput = {
    AND?: ListScalarWhereInput | ListScalarWhereInput[]
    OR?: ListScalarWhereInput[]
    NOT?: ListScalarWhereInput | ListScalarWhereInput[]
    id?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    description?: StringNullableFilter<"List"> | string | null
    userId?: StringFilter<"List"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: FloatFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    userId?: StringFilter<"Review"> | string
    movieId?: IntNullableFilter<"Review"> | number | null
    TVId?: IntNullableFilter<"Review"> | number | null
    type?: EnumShowTypeFilter<"Review"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type WatchedUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchedWhereUniqueInput
    update: XOR<WatchedUpdateWithoutUserInput, WatchedUncheckedUpdateWithoutUserInput>
    create: XOR<WatchedCreateWithoutUserInput, WatchedUncheckedCreateWithoutUserInput>
  }

  export type WatchedUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchedWhereUniqueInput
    data: XOR<WatchedUpdateWithoutUserInput, WatchedUncheckedUpdateWithoutUserInput>
  }

  export type WatchedUpdateManyWithWhereWithoutUserInput = {
    where: WatchedScalarWhereInput
    data: XOR<WatchedUpdateManyMutationInput, WatchedUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchedScalarWhereInput = {
    AND?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
    OR?: WatchedScalarWhereInput[]
    NOT?: WatchedScalarWhereInput | WatchedScalarWhereInput[]
    id?: StringFilter<"Watched"> | string
    userId?: StringFilter<"Watched"> | string
    movieId?: IntNullableFilter<"Watched"> | number | null
    TVId?: IntNullableFilter<"Watched"> | number | null
    type?: EnumShowTypeFilter<"Watched"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Watched"> | Date | string
    updatedAt?: DateTimeFilter<"Watched"> | Date | string
  }

  export type WatchlistUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchlistWhereUniqueInput
    update: XOR<WatchlistUpdateWithoutUserInput, WatchlistUncheckedUpdateWithoutUserInput>
    create: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput>
  }

  export type WatchlistUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchlistWhereUniqueInput
    data: XOR<WatchlistUpdateWithoutUserInput, WatchlistUncheckedUpdateWithoutUserInput>
  }

  export type WatchlistUpdateManyWithWhereWithoutUserInput = {
    where: WatchlistScalarWhereInput
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchlistScalarWhereInput = {
    AND?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
    OR?: WatchlistScalarWhereInput[]
    NOT?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
    id?: StringFilter<"Watchlist"> | string
    userId?: StringFilter<"Watchlist"> | string
    movieId?: IntNullableFilter<"Watchlist"> | number | null
    TVId?: IntNullableFilter<"Watchlist"> | number | null
    type?: EnumShowTypeFilter<"Watchlist"> | $Enums.ShowType
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    updatedAt?: DateTimeFilter<"Watchlist"> | Date | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    watched?: WatchedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    watched?: WatchedUncheckedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    watched?: WatchedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    watched?: WatchedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    watched?: WatchedUncheckedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    watched?: WatchedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MovieCreateWithoutDirectorsInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutDirectorsInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutDirectorsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput>
  }

  export type MovieCreateWithoutProducersInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutProducersInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutProducersInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutProducersInput, MovieUncheckedCreateWithoutProducersInput>
  }

  export type MovieCreateWithoutExecProducersInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutExecProducersInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutExecProducersInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutExecProducersInput, MovieUncheckedCreateWithoutExecProducersInput>
  }

  export type MovieCreateWithoutWritersInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutWritersInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutWritersInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutWritersInput, MovieUncheckedCreateWithoutWritersInput>
  }

  export type MovieCreateWithoutComposersInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutComposersInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutComposersInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutComposersInput, MovieUncheckedCreateWithoutComposersInput>
  }

  export type MovieCreateWithoutCinematographersInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
  }

  export type MovieUncheckedCreateWithoutCinematographersInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
  }

  export type MovieCreateOrConnectWithoutCinematographersInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutCinematographersInput, MovieUncheckedCreateWithoutCinematographersInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutDirectorsInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutDirectorsInput, MovieUncheckedUpdateWithoutDirectorsInput>
    create: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutDirectorsInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutDirectorsInput, MovieUncheckedUpdateWithoutDirectorsInput>
  }

  export type MovieUpdateManyWithWhereWithoutDirectorsInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutDirectorsInput>
  }

  export type MovieScalarWhereInput = {
    AND?: MovieScalarWhereInput | MovieScalarWhereInput[]
    OR?: MovieScalarWhereInput[]
    NOT?: MovieScalarWhereInput | MovieScalarWhereInput[]
    id?: IntFilter<"Movie"> | number
    title?: StringFilter<"Movie"> | string
    description?: StringNullableFilter<"Movie"> | string | null
    poster?: StringNullableFilter<"Movie"> | string | null
    release_date?: DateTimeNullableFilter<"Movie"> | Date | string | null
    runtime?: IntNullableFilter<"Movie"> | number | null
  }

  export type MovieUpsertWithWhereUniqueWithoutProducersInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutProducersInput, MovieUncheckedUpdateWithoutProducersInput>
    create: XOR<MovieCreateWithoutProducersInput, MovieUncheckedCreateWithoutProducersInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutProducersInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutProducersInput, MovieUncheckedUpdateWithoutProducersInput>
  }

  export type MovieUpdateManyWithWhereWithoutProducersInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutProducersInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutExecProducersInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutExecProducersInput, MovieUncheckedUpdateWithoutExecProducersInput>
    create: XOR<MovieCreateWithoutExecProducersInput, MovieUncheckedCreateWithoutExecProducersInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutExecProducersInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutExecProducersInput, MovieUncheckedUpdateWithoutExecProducersInput>
  }

  export type MovieUpdateManyWithWhereWithoutExecProducersInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutExecProducersInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutWritersInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutWritersInput, MovieUncheckedUpdateWithoutWritersInput>
    create: XOR<MovieCreateWithoutWritersInput, MovieUncheckedCreateWithoutWritersInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutWritersInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutWritersInput, MovieUncheckedUpdateWithoutWritersInput>
  }

  export type MovieUpdateManyWithWhereWithoutWritersInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutWritersInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutComposersInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutComposersInput, MovieUncheckedUpdateWithoutComposersInput>
    create: XOR<MovieCreateWithoutComposersInput, MovieUncheckedCreateWithoutComposersInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutComposersInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutComposersInput, MovieUncheckedUpdateWithoutComposersInput>
  }

  export type MovieUpdateManyWithWhereWithoutComposersInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutComposersInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutCinematographersInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutCinematographersInput, MovieUncheckedUpdateWithoutCinematographersInput>
    create: XOR<MovieCreateWithoutCinematographersInput, MovieUncheckedCreateWithoutCinematographersInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutCinematographersInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutCinematographersInput, MovieUncheckedUpdateWithoutCinematographersInput>
  }

  export type MovieUpdateManyWithWhereWithoutCinematographersInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutCinematographersInput>
  }

  export type MovieGenreCreateWithoutMoviesInput = {
    id: number
    name: string
  }

  export type MovieGenreUncheckedCreateWithoutMoviesInput = {
    id: number
    name: string
  }

  export type MovieGenreCreateOrConnectWithoutMoviesInput = {
    where: MovieGenreWhereUniqueInput
    create: XOR<MovieGenreCreateWithoutMoviesInput, MovieGenreUncheckedCreateWithoutMoviesInput>
  }

  export type ProductionCompanyCreateWithoutMoviesInput = {
    id: number
    name: string
  }

  export type ProductionCompanyUncheckedCreateWithoutMoviesInput = {
    id: number
    name: string
  }

  export type ProductionCompanyCreateOrConnectWithoutMoviesInput = {
    where: ProductionCompanyWhereUniqueInput
    create: XOR<ProductionCompanyCreateWithoutMoviesInput, ProductionCompanyUncheckedCreateWithoutMoviesInput>
  }

  export type ReviewCreateWithoutMovieInput = {
    id?: string
    rating: number
    comment?: string | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutMovieInput = {
    id?: string
    rating: number
    comment?: string | null
    userId: string
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutMovieInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutMovieInput, ReviewUncheckedCreateWithoutMovieInput>
  }

  export type ReviewCreateManyMovieInputEnvelope = {
    data: ReviewCreateManyMovieInput | ReviewCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type WatchedCreateWithoutMovieInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutWatchedInput
    user: UserCreateNestedOneWithoutWatchedInput
  }

  export type WatchedUncheckedCreateWithoutMovieInput = {
    id?: string
    userId: string
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedCreateOrConnectWithoutMovieInput = {
    where: WatchedWhereUniqueInput
    create: XOR<WatchedCreateWithoutMovieInput, WatchedUncheckedCreateWithoutMovieInput>
  }

  export type WatchedCreateManyMovieInputEnvelope = {
    data: WatchedCreateManyMovieInput | WatchedCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistCreateWithoutMovieInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    TVShow?: TVShowCreateNestedOneWithoutWatchlistsInput
    user: UserCreateNestedOneWithoutWatchlistsInput
  }

  export type WatchlistUncheckedCreateWithoutMovieInput = {
    id?: string
    userId: string
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateOrConnectWithoutMovieInput = {
    where: WatchlistWhereUniqueInput
    create: XOR<WatchlistCreateWithoutMovieInput, WatchlistUncheckedCreateWithoutMovieInput>
  }

  export type WatchlistCreateManyMovieInputEnvelope = {
    data: WatchlistCreateManyMovieInput | WatchlistCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type ListCreateWithoutMoviesInput = {
    id?: string
    name: string
    description?: string | null
    user: UserCreateNestedOneWithoutListsInput
    TVShows?: TVShowCreateNestedManyWithoutListsInput
  }

  export type ListUncheckedCreateWithoutMoviesInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    TVShows?: TVShowUncheckedCreateNestedManyWithoutListsInput
  }

  export type ListCreateOrConnectWithoutMoviesInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutMoviesInput, ListUncheckedCreateWithoutMoviesInput>
  }

  export type PersonCreateWithoutDirectedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    producedMovies?: MovieCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieCreateNestedManyWithoutWritersInput
    composedMovies?: MovieCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUncheckedCreateWithoutDirectedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    producedMovies?: MovieUncheckedCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieUncheckedCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieUncheckedCreateNestedManyWithoutWritersInput
    composedMovies?: MovieUncheckedCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieUncheckedCreateNestedManyWithoutCinematographersInput
  }

  export type PersonCreateOrConnectWithoutDirectedMoviesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutDirectedMoviesInput, PersonUncheckedCreateWithoutDirectedMoviesInput>
  }

  export type PersonCreateWithoutProducedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieCreateNestedManyWithoutDirectorsInput
    execProducedMovies?: MovieCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieCreateNestedManyWithoutWritersInput
    composedMovies?: MovieCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUncheckedCreateWithoutProducedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieUncheckedCreateNestedManyWithoutDirectorsInput
    execProducedMovies?: MovieUncheckedCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieUncheckedCreateNestedManyWithoutWritersInput
    composedMovies?: MovieUncheckedCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieUncheckedCreateNestedManyWithoutCinematographersInput
  }

  export type PersonCreateOrConnectWithoutProducedMoviesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutProducedMoviesInput, PersonUncheckedCreateWithoutProducedMoviesInput>
  }

  export type PersonCreateWithoutExecProducedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieCreateNestedManyWithoutProducersInput
    writtenMovies?: MovieCreateNestedManyWithoutWritersInput
    composedMovies?: MovieCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUncheckedCreateWithoutExecProducedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieUncheckedCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieUncheckedCreateNestedManyWithoutProducersInput
    writtenMovies?: MovieUncheckedCreateNestedManyWithoutWritersInput
    composedMovies?: MovieUncheckedCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieUncheckedCreateNestedManyWithoutCinematographersInput
  }

  export type PersonCreateOrConnectWithoutExecProducedMoviesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutExecProducedMoviesInput, PersonUncheckedCreateWithoutExecProducedMoviesInput>
  }

  export type PersonCreateWithoutWrittenMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieCreateNestedManyWithoutExecProducersInput
    composedMovies?: MovieCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUncheckedCreateWithoutWrittenMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieUncheckedCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieUncheckedCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieUncheckedCreateNestedManyWithoutExecProducersInput
    composedMovies?: MovieUncheckedCreateNestedManyWithoutComposersInput
    cinematographyMovies?: MovieUncheckedCreateNestedManyWithoutCinematographersInput
  }

  export type PersonCreateOrConnectWithoutWrittenMoviesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutWrittenMoviesInput, PersonUncheckedCreateWithoutWrittenMoviesInput>
  }

  export type PersonCreateWithoutComposedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieCreateNestedManyWithoutWritersInput
    cinematographyMovies?: MovieCreateNestedManyWithoutCinematographersInput
  }

  export type PersonUncheckedCreateWithoutComposedMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieUncheckedCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieUncheckedCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieUncheckedCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieUncheckedCreateNestedManyWithoutWritersInput
    cinematographyMovies?: MovieUncheckedCreateNestedManyWithoutCinematographersInput
  }

  export type PersonCreateOrConnectWithoutComposedMoviesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutComposedMoviesInput, PersonUncheckedCreateWithoutComposedMoviesInput>
  }

  export type PersonCreateWithoutCinematographyMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieCreateNestedManyWithoutWritersInput
    composedMovies?: MovieCreateNestedManyWithoutComposersInput
  }

  export type PersonUncheckedCreateWithoutCinematographyMoviesInput = {
    id: number
    name: string
    profile_path: string
    job?: PersonCreatejobInput | string[]
    directedMovies?: MovieUncheckedCreateNestedManyWithoutDirectorsInput
    producedMovies?: MovieUncheckedCreateNestedManyWithoutProducersInput
    execProducedMovies?: MovieUncheckedCreateNestedManyWithoutExecProducersInput
    writtenMovies?: MovieUncheckedCreateNestedManyWithoutWritersInput
    composedMovies?: MovieUncheckedCreateNestedManyWithoutComposersInput
  }

  export type PersonCreateOrConnectWithoutCinematographyMoviesInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutCinematographyMoviesInput, PersonUncheckedCreateWithoutCinematographyMoviesInput>
  }

  export type MovieGenreUpsertWithWhereUniqueWithoutMoviesInput = {
    where: MovieGenreWhereUniqueInput
    update: XOR<MovieGenreUpdateWithoutMoviesInput, MovieGenreUncheckedUpdateWithoutMoviesInput>
    create: XOR<MovieGenreCreateWithoutMoviesInput, MovieGenreUncheckedCreateWithoutMoviesInput>
  }

  export type MovieGenreUpdateWithWhereUniqueWithoutMoviesInput = {
    where: MovieGenreWhereUniqueInput
    data: XOR<MovieGenreUpdateWithoutMoviesInput, MovieGenreUncheckedUpdateWithoutMoviesInput>
  }

  export type MovieGenreUpdateManyWithWhereWithoutMoviesInput = {
    where: MovieGenreScalarWhereInput
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyWithoutMoviesInput>
  }

  export type MovieGenreScalarWhereInput = {
    AND?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
    OR?: MovieGenreScalarWhereInput[]
    NOT?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
    id?: IntFilter<"MovieGenre"> | number
    name?: StringFilter<"MovieGenre"> | string
  }

  export type ProductionCompanyUpsertWithWhereUniqueWithoutMoviesInput = {
    where: ProductionCompanyWhereUniqueInput
    update: XOR<ProductionCompanyUpdateWithoutMoviesInput, ProductionCompanyUncheckedUpdateWithoutMoviesInput>
    create: XOR<ProductionCompanyCreateWithoutMoviesInput, ProductionCompanyUncheckedCreateWithoutMoviesInput>
  }

  export type ProductionCompanyUpdateWithWhereUniqueWithoutMoviesInput = {
    where: ProductionCompanyWhereUniqueInput
    data: XOR<ProductionCompanyUpdateWithoutMoviesInput, ProductionCompanyUncheckedUpdateWithoutMoviesInput>
  }

  export type ProductionCompanyUpdateManyWithWhereWithoutMoviesInput = {
    where: ProductionCompanyScalarWhereInput
    data: XOR<ProductionCompanyUpdateManyMutationInput, ProductionCompanyUncheckedUpdateManyWithoutMoviesInput>
  }

  export type ProductionCompanyScalarWhereInput = {
    AND?: ProductionCompanyScalarWhereInput | ProductionCompanyScalarWhereInput[]
    OR?: ProductionCompanyScalarWhereInput[]
    NOT?: ProductionCompanyScalarWhereInput | ProductionCompanyScalarWhereInput[]
    id?: IntFilter<"ProductionCompany"> | number
    name?: StringFilter<"ProductionCompany"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutMovieInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutMovieInput, ReviewUncheckedUpdateWithoutMovieInput>
    create: XOR<ReviewCreateWithoutMovieInput, ReviewUncheckedCreateWithoutMovieInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutMovieInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutMovieInput, ReviewUncheckedUpdateWithoutMovieInput>
  }

  export type ReviewUpdateManyWithWhereWithoutMovieInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutMovieInput>
  }

  export type WatchedUpsertWithWhereUniqueWithoutMovieInput = {
    where: WatchedWhereUniqueInput
    update: XOR<WatchedUpdateWithoutMovieInput, WatchedUncheckedUpdateWithoutMovieInput>
    create: XOR<WatchedCreateWithoutMovieInput, WatchedUncheckedCreateWithoutMovieInput>
  }

  export type WatchedUpdateWithWhereUniqueWithoutMovieInput = {
    where: WatchedWhereUniqueInput
    data: XOR<WatchedUpdateWithoutMovieInput, WatchedUncheckedUpdateWithoutMovieInput>
  }

  export type WatchedUpdateManyWithWhereWithoutMovieInput = {
    where: WatchedScalarWhereInput
    data: XOR<WatchedUpdateManyMutationInput, WatchedUncheckedUpdateManyWithoutMovieInput>
  }

  export type WatchlistUpsertWithWhereUniqueWithoutMovieInput = {
    where: WatchlistWhereUniqueInput
    update: XOR<WatchlistUpdateWithoutMovieInput, WatchlistUncheckedUpdateWithoutMovieInput>
    create: XOR<WatchlistCreateWithoutMovieInput, WatchlistUncheckedCreateWithoutMovieInput>
  }

  export type WatchlistUpdateWithWhereUniqueWithoutMovieInput = {
    where: WatchlistWhereUniqueInput
    data: XOR<WatchlistUpdateWithoutMovieInput, WatchlistUncheckedUpdateWithoutMovieInput>
  }

  export type WatchlistUpdateManyWithWhereWithoutMovieInput = {
    where: WatchlistScalarWhereInput
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyWithoutMovieInput>
  }

  export type ListUpsertWithWhereUniqueWithoutMoviesInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutMoviesInput, ListUncheckedUpdateWithoutMoviesInput>
    create: XOR<ListCreateWithoutMoviesInput, ListUncheckedCreateWithoutMoviesInput>
  }

  export type ListUpdateWithWhereUniqueWithoutMoviesInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutMoviesInput, ListUncheckedUpdateWithoutMoviesInput>
  }

  export type ListUpdateManyWithWhereWithoutMoviesInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutMoviesInput>
  }

  export type PersonUpsertWithWhereUniqueWithoutDirectedMoviesInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutDirectedMoviesInput, PersonUncheckedUpdateWithoutDirectedMoviesInput>
    create: XOR<PersonCreateWithoutDirectedMoviesInput, PersonUncheckedCreateWithoutDirectedMoviesInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutDirectedMoviesInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutDirectedMoviesInput, PersonUncheckedUpdateWithoutDirectedMoviesInput>
  }

  export type PersonUpdateManyWithWhereWithoutDirectedMoviesInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutDirectedMoviesInput>
  }

  export type PersonScalarWhereInput = {
    AND?: PersonScalarWhereInput | PersonScalarWhereInput[]
    OR?: PersonScalarWhereInput[]
    NOT?: PersonScalarWhereInput | PersonScalarWhereInput[]
    id?: IntFilter<"Person"> | number
    name?: StringFilter<"Person"> | string
    profile_path?: StringFilter<"Person"> | string
    job?: StringNullableListFilter<"Person">
  }

  export type PersonUpsertWithWhereUniqueWithoutProducedMoviesInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutProducedMoviesInput, PersonUncheckedUpdateWithoutProducedMoviesInput>
    create: XOR<PersonCreateWithoutProducedMoviesInput, PersonUncheckedCreateWithoutProducedMoviesInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutProducedMoviesInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutProducedMoviesInput, PersonUncheckedUpdateWithoutProducedMoviesInput>
  }

  export type PersonUpdateManyWithWhereWithoutProducedMoviesInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutProducedMoviesInput>
  }

  export type PersonUpsertWithWhereUniqueWithoutExecProducedMoviesInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutExecProducedMoviesInput, PersonUncheckedUpdateWithoutExecProducedMoviesInput>
    create: XOR<PersonCreateWithoutExecProducedMoviesInput, PersonUncheckedCreateWithoutExecProducedMoviesInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutExecProducedMoviesInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutExecProducedMoviesInput, PersonUncheckedUpdateWithoutExecProducedMoviesInput>
  }

  export type PersonUpdateManyWithWhereWithoutExecProducedMoviesInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutExecProducedMoviesInput>
  }

  export type PersonUpsertWithWhereUniqueWithoutWrittenMoviesInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutWrittenMoviesInput, PersonUncheckedUpdateWithoutWrittenMoviesInput>
    create: XOR<PersonCreateWithoutWrittenMoviesInput, PersonUncheckedCreateWithoutWrittenMoviesInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutWrittenMoviesInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutWrittenMoviesInput, PersonUncheckedUpdateWithoutWrittenMoviesInput>
  }

  export type PersonUpdateManyWithWhereWithoutWrittenMoviesInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutWrittenMoviesInput>
  }

  export type PersonUpsertWithWhereUniqueWithoutComposedMoviesInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutComposedMoviesInput, PersonUncheckedUpdateWithoutComposedMoviesInput>
    create: XOR<PersonCreateWithoutComposedMoviesInput, PersonUncheckedCreateWithoutComposedMoviesInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutComposedMoviesInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutComposedMoviesInput, PersonUncheckedUpdateWithoutComposedMoviesInput>
  }

  export type PersonUpdateManyWithWhereWithoutComposedMoviesInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutComposedMoviesInput>
  }

  export type PersonUpsertWithWhereUniqueWithoutCinematographyMoviesInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutCinematographyMoviesInput, PersonUncheckedUpdateWithoutCinematographyMoviesInput>
    create: XOR<PersonCreateWithoutCinematographyMoviesInput, PersonUncheckedCreateWithoutCinematographyMoviesInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutCinematographyMoviesInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutCinematographyMoviesInput, PersonUncheckedUpdateWithoutCinematographyMoviesInput>
  }

  export type PersonUpdateManyWithWhereWithoutCinematographyMoviesInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutCinematographyMoviesInput>
  }

  export type MovieCreateWithoutGenresInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutGenresInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutGenresInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutGenresInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutGenresInput, MovieUncheckedUpdateWithoutGenresInput>
    create: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutGenresInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutGenresInput, MovieUncheckedUpdateWithoutGenresInput>
  }

  export type MovieUpdateManyWithWhereWithoutGenresInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutGenresInput>
  }

  export type MovieCreateWithoutProductionCompaniesInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutProductionCompaniesInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutProductionCompaniesInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutProductionCompaniesInput, MovieUncheckedCreateWithoutProductionCompaniesInput>
  }

  export type MovieUpsertWithWhereUniqueWithoutProductionCompaniesInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutProductionCompaniesInput, MovieUncheckedUpdateWithoutProductionCompaniesInput>
    create: XOR<MovieCreateWithoutProductionCompaniesInput, MovieUncheckedCreateWithoutProductionCompaniesInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutProductionCompaniesInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutProductionCompaniesInput, MovieUncheckedUpdateWithoutProductionCompaniesInput>
  }

  export type MovieUpdateManyWithWhereWithoutProductionCompaniesInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutProductionCompaniesInput>
  }

  export type ReviewCreateWithoutTVShowInput = {
    id?: string
    rating: number
    comment?: string | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    movie?: MovieCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutTVShowInput = {
    id?: string
    rating: number
    comment?: string | null
    userId: string
    movieId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutTVShowInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutTVShowInput, ReviewUncheckedCreateWithoutTVShowInput>
  }

  export type ReviewCreateManyTVShowInputEnvelope = {
    data: ReviewCreateManyTVShowInput | ReviewCreateManyTVShowInput[]
    skipDuplicates?: boolean
  }

  export type WatchedCreateWithoutTVShowInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    movie?: MovieCreateNestedOneWithoutWatchedInput
    user: UserCreateNestedOneWithoutWatchedInput
  }

  export type WatchedUncheckedCreateWithoutTVShowInput = {
    id?: string
    userId: string
    movieId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedCreateOrConnectWithoutTVShowInput = {
    where: WatchedWhereUniqueInput
    create: XOR<WatchedCreateWithoutTVShowInput, WatchedUncheckedCreateWithoutTVShowInput>
  }

  export type WatchedCreateManyTVShowInputEnvelope = {
    data: WatchedCreateManyTVShowInput | WatchedCreateManyTVShowInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistCreateWithoutTVShowInput = {
    id?: string
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
    movie?: MovieCreateNestedOneWithoutWatchlistsInput
    user: UserCreateNestedOneWithoutWatchlistsInput
  }

  export type WatchlistUncheckedCreateWithoutTVShowInput = {
    id?: string
    userId: string
    movieId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateOrConnectWithoutTVShowInput = {
    where: WatchlistWhereUniqueInput
    create: XOR<WatchlistCreateWithoutTVShowInput, WatchlistUncheckedCreateWithoutTVShowInput>
  }

  export type WatchlistCreateManyTVShowInputEnvelope = {
    data: WatchlistCreateManyTVShowInput | WatchlistCreateManyTVShowInput[]
    skipDuplicates?: boolean
  }

  export type ListCreateWithoutTVShowsInput = {
    id?: string
    name: string
    description?: string | null
    user: UserCreateNestedOneWithoutListsInput
    movies?: MovieCreateNestedManyWithoutListsInput
  }

  export type ListUncheckedCreateWithoutTVShowsInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    movies?: MovieUncheckedCreateNestedManyWithoutListsInput
  }

  export type ListCreateOrConnectWithoutTVShowsInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutTVShowsInput, ListUncheckedCreateWithoutTVShowsInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutTVShowInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutTVShowInput, ReviewUncheckedUpdateWithoutTVShowInput>
    create: XOR<ReviewCreateWithoutTVShowInput, ReviewUncheckedCreateWithoutTVShowInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutTVShowInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutTVShowInput, ReviewUncheckedUpdateWithoutTVShowInput>
  }

  export type ReviewUpdateManyWithWhereWithoutTVShowInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutTVShowInput>
  }

  export type WatchedUpsertWithWhereUniqueWithoutTVShowInput = {
    where: WatchedWhereUniqueInput
    update: XOR<WatchedUpdateWithoutTVShowInput, WatchedUncheckedUpdateWithoutTVShowInput>
    create: XOR<WatchedCreateWithoutTVShowInput, WatchedUncheckedCreateWithoutTVShowInput>
  }

  export type WatchedUpdateWithWhereUniqueWithoutTVShowInput = {
    where: WatchedWhereUniqueInput
    data: XOR<WatchedUpdateWithoutTVShowInput, WatchedUncheckedUpdateWithoutTVShowInput>
  }

  export type WatchedUpdateManyWithWhereWithoutTVShowInput = {
    where: WatchedScalarWhereInput
    data: XOR<WatchedUpdateManyMutationInput, WatchedUncheckedUpdateManyWithoutTVShowInput>
  }

  export type WatchlistUpsertWithWhereUniqueWithoutTVShowInput = {
    where: WatchlistWhereUniqueInput
    update: XOR<WatchlistUpdateWithoutTVShowInput, WatchlistUncheckedUpdateWithoutTVShowInput>
    create: XOR<WatchlistCreateWithoutTVShowInput, WatchlistUncheckedCreateWithoutTVShowInput>
  }

  export type WatchlistUpdateWithWhereUniqueWithoutTVShowInput = {
    where: WatchlistWhereUniqueInput
    data: XOR<WatchlistUpdateWithoutTVShowInput, WatchlistUncheckedUpdateWithoutTVShowInput>
  }

  export type WatchlistUpdateManyWithWhereWithoutTVShowInput = {
    where: WatchlistScalarWhereInput
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyWithoutTVShowInput>
  }

  export type ListUpsertWithWhereUniqueWithoutTVShowsInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutTVShowsInput, ListUncheckedUpdateWithoutTVShowsInput>
    create: XOR<ListCreateWithoutTVShowsInput, ListUncheckedCreateWithoutTVShowsInput>
  }

  export type ListUpdateWithWhereUniqueWithoutTVShowsInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutTVShowsInput, ListUncheckedUpdateWithoutTVShowsInput>
  }

  export type ListUpdateManyWithWhereWithoutTVShowsInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutTVShowsInput>
  }

  export type TVShowCreateWithoutReviewsInput = {
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    watched?: WatchedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistCreateNestedManyWithoutTVShowInput
    lists?: ListCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowUncheckedCreateWithoutReviewsInput = {
    id?: number
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    watched?: WatchedUncheckedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutTVShowInput
    lists?: ListUncheckedCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowCreateOrConnectWithoutReviewsInput = {
    where: TVShowWhereUniqueInput
    create: XOR<TVShowCreateWithoutReviewsInput, TVShowUncheckedCreateWithoutReviewsInput>
  }

  export type MovieCreateWithoutReviewsInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutReviewsInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutReviewsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutReviewsInput, MovieUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListCreateNestedManyWithoutUserInput
    watched?: WatchedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    watched?: WatchedUncheckedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type TVShowUpsertWithoutReviewsInput = {
    update: XOR<TVShowUpdateWithoutReviewsInput, TVShowUncheckedUpdateWithoutReviewsInput>
    create: XOR<TVShowCreateWithoutReviewsInput, TVShowUncheckedCreateWithoutReviewsInput>
    where?: TVShowWhereInput
  }

  export type TVShowUpdateToOneWithWhereWithoutReviewsInput = {
    where?: TVShowWhereInput
    data: XOR<TVShowUpdateWithoutReviewsInput, TVShowUncheckedUpdateWithoutReviewsInput>
  }

  export type TVShowUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    watched?: WatchedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUpdateManyWithoutTVShowNestedInput
    lists?: ListUpdateManyWithoutTVShowsNestedInput
  }

  export type TVShowUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    watched?: WatchedUncheckedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutTVShowNestedInput
    lists?: ListUncheckedUpdateManyWithoutTVShowsNestedInput
  }

  export type MovieUpsertWithoutReviewsInput = {
    update: XOR<MovieUpdateWithoutReviewsInput, MovieUncheckedUpdateWithoutReviewsInput>
    create: XOR<MovieCreateWithoutReviewsInput, MovieUncheckedCreateWithoutReviewsInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutReviewsInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutReviewsInput, MovieUncheckedUpdateWithoutReviewsInput>
  }

  export type MovieUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUpdateManyWithoutUserNestedInput
    watched?: WatchedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TVShowCreateWithoutWatchedInput = {
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistCreateNestedManyWithoutTVShowInput
    lists?: ListCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowUncheckedCreateWithoutWatchedInput = {
    id?: number
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutTVShowInput
    lists?: ListUncheckedCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowCreateOrConnectWithoutWatchedInput = {
    where: TVShowWhereUniqueInput
    create: XOR<TVShowCreateWithoutWatchedInput, TVShowUncheckedCreateWithoutWatchedInput>
  }

  export type MovieCreateWithoutWatchedInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutWatchedInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutWatchedInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutWatchedInput, MovieUncheckedCreateWithoutWatchedInput>
  }

  export type UserCreateWithoutWatchedInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    watchlists?: WatchlistCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchedInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
  }

  export type TVShowUpsertWithoutWatchedInput = {
    update: XOR<TVShowUpdateWithoutWatchedInput, TVShowUncheckedUpdateWithoutWatchedInput>
    create: XOR<TVShowCreateWithoutWatchedInput, TVShowUncheckedCreateWithoutWatchedInput>
    where?: TVShowWhereInput
  }

  export type TVShowUpdateToOneWithWhereWithoutWatchedInput = {
    where?: TVShowWhereInput
    data: XOR<TVShowUpdateWithoutWatchedInput, TVShowUncheckedUpdateWithoutWatchedInput>
  }

  export type TVShowUpdateWithoutWatchedInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUpdateManyWithoutTVShowNestedInput
    lists?: ListUpdateManyWithoutTVShowsNestedInput
  }

  export type TVShowUncheckedUpdateWithoutWatchedInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutTVShowNestedInput
    lists?: ListUncheckedUpdateManyWithoutTVShowsNestedInput
  }

  export type MovieUpsertWithoutWatchedInput = {
    update: XOR<MovieUpdateWithoutWatchedInput, MovieUncheckedUpdateWithoutWatchedInput>
    create: XOR<MovieCreateWithoutWatchedInput, MovieUncheckedCreateWithoutWatchedInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutWatchedInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutWatchedInput, MovieUncheckedUpdateWithoutWatchedInput>
  }

  export type MovieUpdateWithoutWatchedInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutWatchedInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type UserUpsertWithoutWatchedInput = {
    update: XOR<UserUpdateWithoutWatchedInput, UserUncheckedUpdateWithoutWatchedInput>
    create: XOR<UserCreateWithoutWatchedInput, UserUncheckedCreateWithoutWatchedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchedInput, UserUncheckedUpdateWithoutWatchedInput>
  }

  export type UserUpdateWithoutWatchedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TVShowCreateWithoutWatchlistsInput = {
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewCreateNestedManyWithoutTVShowInput
    watched?: WatchedCreateNestedManyWithoutTVShowInput
    lists?: ListCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowUncheckedCreateWithoutWatchlistsInput = {
    id?: number
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutTVShowInput
    watched?: WatchedUncheckedCreateNestedManyWithoutTVShowInput
    lists?: ListUncheckedCreateNestedManyWithoutTVShowsInput
  }

  export type TVShowCreateOrConnectWithoutWatchlistsInput = {
    where: TVShowWhereUniqueInput
    create: XOR<TVShowCreateWithoutWatchlistsInput, TVShowUncheckedCreateWithoutWatchlistsInput>
  }

  export type MovieCreateWithoutWatchlistsInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    lists?: ListCreateNestedManyWithoutMoviesInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutWatchlistsInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    lists?: ListUncheckedCreateNestedManyWithoutMoviesInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutWatchlistsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutWatchlistsInput, MovieUncheckedCreateWithoutWatchlistsInput>
  }

  export type UserCreateWithoutWatchlistsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    watched?: WatchedCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchlistsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    watched?: WatchedUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchlistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchlistsInput, UserUncheckedCreateWithoutWatchlistsInput>
  }

  export type TVShowUpsertWithoutWatchlistsInput = {
    update: XOR<TVShowUpdateWithoutWatchlistsInput, TVShowUncheckedUpdateWithoutWatchlistsInput>
    create: XOR<TVShowCreateWithoutWatchlistsInput, TVShowUncheckedCreateWithoutWatchlistsInput>
    where?: TVShowWhereInput
  }

  export type TVShowUpdateToOneWithWhereWithoutWatchlistsInput = {
    where?: TVShowWhereInput
    data: XOR<TVShowUpdateWithoutWatchlistsInput, TVShowUncheckedUpdateWithoutWatchlistsInput>
  }

  export type TVShowUpdateWithoutWatchlistsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUpdateManyWithoutTVShowNestedInput
    watched?: WatchedUpdateManyWithoutTVShowNestedInput
    lists?: ListUpdateManyWithoutTVShowsNestedInput
  }

  export type TVShowUncheckedUpdateWithoutWatchlistsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutTVShowNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutTVShowNestedInput
    lists?: ListUncheckedUpdateManyWithoutTVShowsNestedInput
  }

  export type MovieUpsertWithoutWatchlistsInput = {
    update: XOR<MovieUpdateWithoutWatchlistsInput, MovieUncheckedUpdateWithoutWatchlistsInput>
    create: XOR<MovieCreateWithoutWatchlistsInput, MovieUncheckedCreateWithoutWatchlistsInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutWatchlistsInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutWatchlistsInput, MovieUncheckedUpdateWithoutWatchlistsInput>
  }

  export type MovieUpdateWithoutWatchlistsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutWatchlistsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type UserUpsertWithoutWatchlistsInput = {
    update: XOR<UserUpdateWithoutWatchlistsInput, UserUncheckedUpdateWithoutWatchlistsInput>
    create: XOR<UserCreateWithoutWatchlistsInput, UserUncheckedCreateWithoutWatchlistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchlistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchlistsInput, UserUncheckedUpdateWithoutWatchlistsInput>
  }

  export type UserUpdateWithoutWatchlistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    watched?: WatchedUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchlistsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutListsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    reviews?: ReviewCreateNestedManyWithoutUserInput
    watched?: WatchedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    bio?: string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    watched?: WatchedUncheckedCreateNestedManyWithoutUserInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
  }

  export type MovieCreateWithoutListsInput = {
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyCreateNestedManyWithoutMoviesInput
    reviews?: ReviewCreateNestedManyWithoutMovieInput
    watched?: WatchedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistCreateNestedManyWithoutMovieInput
    directors?: PersonCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieUncheckedCreateWithoutListsInput = {
    id?: number
    title: string
    description?: string | null
    poster?: string | null
    release_date?: Date | string | null
    runtime?: number | null
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMoviesInput
    productionCompanies?: ProductionCompanyUncheckedCreateNestedManyWithoutMoviesInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutMovieInput
    watched?: WatchedUncheckedCreateNestedManyWithoutMovieInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutMovieInput
    directors?: PersonUncheckedCreateNestedManyWithoutDirectedMoviesInput
    producers?: PersonUncheckedCreateNestedManyWithoutProducedMoviesInput
    execProducers?: PersonUncheckedCreateNestedManyWithoutExecProducedMoviesInput
    writers?: PersonUncheckedCreateNestedManyWithoutWrittenMoviesInput
    composers?: PersonUncheckedCreateNestedManyWithoutComposedMoviesInput
    cinematographers?: PersonUncheckedCreateNestedManyWithoutCinematographyMoviesInput
  }

  export type MovieCreateOrConnectWithoutListsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutListsInput, MovieUncheckedCreateWithoutListsInput>
  }

  export type TVShowCreateWithoutListsInput = {
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewCreateNestedManyWithoutTVShowInput
    watched?: WatchedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistCreateNestedManyWithoutTVShowInput
  }

  export type TVShowUncheckedCreateWithoutListsInput = {
    id?: number
    title: string
    description?: string | null
    endYear?: number | null
    poster?: string | null
    first_air_date?: Date | string | null
    reviews?: ReviewUncheckedCreateNestedManyWithoutTVShowInput
    watched?: WatchedUncheckedCreateNestedManyWithoutTVShowInput
    watchlists?: WatchlistUncheckedCreateNestedManyWithoutTVShowInput
  }

  export type TVShowCreateOrConnectWithoutListsInput = {
    where: TVShowWhereUniqueInput
    create: XOR<TVShowCreateWithoutListsInput, TVShowUncheckedCreateWithoutListsInput>
  }

  export type UserUpsertWithoutListsInput = {
    update: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
  }

  export type UserUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    watched?: WatchedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutUserNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MovieUpsertWithWhereUniqueWithoutListsInput = {
    where: MovieWhereUniqueInput
    update: XOR<MovieUpdateWithoutListsInput, MovieUncheckedUpdateWithoutListsInput>
    create: XOR<MovieCreateWithoutListsInput, MovieUncheckedCreateWithoutListsInput>
  }

  export type MovieUpdateWithWhereUniqueWithoutListsInput = {
    where: MovieWhereUniqueInput
    data: XOR<MovieUpdateWithoutListsInput, MovieUncheckedUpdateWithoutListsInput>
  }

  export type MovieUpdateManyWithWhereWithoutListsInput = {
    where: MovieScalarWhereInput
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyWithoutListsInput>
  }

  export type TVShowUpsertWithWhereUniqueWithoutListsInput = {
    where: TVShowWhereUniqueInput
    update: XOR<TVShowUpdateWithoutListsInput, TVShowUncheckedUpdateWithoutListsInput>
    create: XOR<TVShowCreateWithoutListsInput, TVShowUncheckedCreateWithoutListsInput>
  }

  export type TVShowUpdateWithWhereUniqueWithoutListsInput = {
    where: TVShowWhereUniqueInput
    data: XOR<TVShowUpdateWithoutListsInput, TVShowUncheckedUpdateWithoutListsInput>
  }

  export type TVShowUpdateManyWithWhereWithoutListsInput = {
    where: TVShowScalarWhereInput
    data: XOR<TVShowUpdateManyMutationInput, TVShowUncheckedUpdateManyWithoutListsInput>
  }

  export type TVShowScalarWhereInput = {
    AND?: TVShowScalarWhereInput | TVShowScalarWhereInput[]
    OR?: TVShowScalarWhereInput[]
    NOT?: TVShowScalarWhereInput | TVShowScalarWhereInput[]
    id?: IntFilter<"TVShow"> | number
    title?: StringFilter<"TVShow"> | string
    description?: StringNullableFilter<"TVShow"> | string | null
    endYear?: IntNullableFilter<"TVShow"> | number | null
    poster?: StringNullableFilter<"TVShow"> | string | null
    first_air_date?: DateTimeNullableFilter<"TVShow"> | Date | string | null
  }

  export type ListCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
  }

  export type ReviewCreateManyUserInput = {
    id?: string
    rating: number
    comment?: string | null
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedCreateManyUserInput = {
    id?: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateManyUserInput = {
    id?: string
    movieId?: number | null
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type ListUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    movies?: MovieUpdateManyWithoutListsNestedInput
    TVShows?: TVShowUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    movies?: MovieUncheckedUpdateManyWithoutListsNestedInput
    TVShows?: TVShowUncheckedUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutReviewsNestedInput
    movie?: MovieUpdateOneWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutWatchedNestedInput
    movie?: MovieUpdateOneWithoutWatchedNestedInput
  }

  export type WatchedUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutWatchlistsNestedInput
    movie?: MovieUpdateOneWithoutWatchlistsNestedInput
  }

  export type WatchlistUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MovieUpdateWithoutDirectorsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutDirectorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutDirectorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUpdateWithoutProducersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutProducersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutProducersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUpdateWithoutExecProducersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutExecProducersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutExecProducersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUpdateWithoutWritersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutWritersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutWritersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUpdateWithoutComposersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutComposersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutComposersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUpdateWithoutCinematographersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutCinematographersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutCinematographersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReviewCreateManyMovieInput = {
    id?: string
    rating: number
    comment?: string | null
    userId: string
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedCreateManyMovieInput = {
    id?: string
    userId: string
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateManyMovieInput = {
    id?: string
    userId: string
    TVId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovieGenreUpdateWithoutMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreUncheckedUpdateWithoutMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreUncheckedUpdateManyWithoutMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductionCompanyUpdateWithoutMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductionCompanyUncheckedUpdateWithoutMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ProductionCompanyUncheckedUpdateManyWithoutMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutWatchedNestedInput
    user?: UserUpdateOneRequiredWithoutWatchedNestedInput
  }

  export type WatchedUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    TVShow?: TVShowUpdateOneWithoutWatchlistsNestedInput
    user?: UserUpdateOneRequiredWithoutWatchlistsNestedInput
  }

  export type WatchlistUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    TVId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    TVShows?: TVShowUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    TVShows?: TVShowUncheckedUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateManyWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PersonUpdateWithoutDirectedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    producedMovies?: MovieUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateWithoutDirectedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    producedMovies?: MovieUncheckedUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUncheckedUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUncheckedUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUncheckedUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUncheckedUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutDirectedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type PersonUpdateWithoutProducedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUpdateManyWithoutDirectorsNestedInput
    execProducedMovies?: MovieUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateWithoutProducedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUncheckedUpdateManyWithoutDirectorsNestedInput
    execProducedMovies?: MovieUncheckedUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUncheckedUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUncheckedUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUncheckedUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutProducedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type PersonUpdateWithoutExecProducedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUpdateManyWithoutProducersNestedInput
    writtenMovies?: MovieUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateWithoutExecProducedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUncheckedUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUncheckedUpdateManyWithoutProducersNestedInput
    writtenMovies?: MovieUncheckedUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUncheckedUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUncheckedUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutExecProducedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type PersonUpdateWithoutWrittenMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUpdateManyWithoutExecProducersNestedInput
    composedMovies?: MovieUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateWithoutWrittenMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUncheckedUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUncheckedUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUncheckedUpdateManyWithoutExecProducersNestedInput
    composedMovies?: MovieUncheckedUpdateManyWithoutComposersNestedInput
    cinematographyMovies?: MovieUncheckedUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutWrittenMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type PersonUpdateWithoutComposedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUpdateManyWithoutWritersNestedInput
    cinematographyMovies?: MovieUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateWithoutComposedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUncheckedUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUncheckedUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUncheckedUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUncheckedUpdateManyWithoutWritersNestedInput
    cinematographyMovies?: MovieUncheckedUpdateManyWithoutCinematographersNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutComposedMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type PersonUpdateWithoutCinematographyMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUpdateManyWithoutComposersNestedInput
  }

  export type PersonUncheckedUpdateWithoutCinematographyMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
    directedMovies?: MovieUncheckedUpdateManyWithoutDirectorsNestedInput
    producedMovies?: MovieUncheckedUpdateManyWithoutProducersNestedInput
    execProducedMovies?: MovieUncheckedUpdateManyWithoutExecProducersNestedInput
    writtenMovies?: MovieUncheckedUpdateManyWithoutWritersNestedInput
    composedMovies?: MovieUncheckedUpdateManyWithoutComposersNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutCinematographyMoviesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    profile_path?: StringFieldUpdateOperationsInput | string
    job?: PersonUpdatejobInput | string[]
  }

  export type MovieUpdateWithoutGenresInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutGenresInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type MovieUpdateWithoutProductionCompaniesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    lists?: ListUpdateManyWithoutMoviesNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutProductionCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    lists?: ListUncheckedUpdateManyWithoutMoviesNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutProductionCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ReviewCreateManyTVShowInput = {
    id?: string
    rating: number
    comment?: string | null
    userId: string
    movieId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchedCreateManyTVShowInput = {
    id?: string
    userId: string
    movieId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateManyTVShowInput = {
    id?: string
    userId: string
    movieId?: number | null
    type: $Enums.ShowType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewUpdateWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: MovieUpdateOneWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: FloatFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUpdateWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: MovieUpdateOneWithoutWatchedNestedInput
    user?: UserUpdateOneRequiredWithoutWatchedNestedInput
  }

  export type WatchedUncheckedUpdateWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchedUncheckedUpdateManyWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUpdateWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: MovieUpdateOneWithoutWatchlistsNestedInput
    user?: UserUpdateOneRequiredWithoutWatchlistsNestedInput
  }

  export type WatchlistUncheckedUpdateWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyWithoutTVShowInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumShowTypeFieldUpdateOperationsInput | $Enums.ShowType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUpdateWithoutTVShowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    movies?: MovieUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateWithoutTVShowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    movies?: MovieUncheckedUpdateManyWithoutListsNestedInput
  }

  export type ListUncheckedUpdateManyWithoutTVShowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieUpdateWithoutListsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUpdateManyWithoutMovieNestedInput
    watched?: WatchedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUpdateManyWithoutMovieNestedInput
    directors?: PersonUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateWithoutListsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
    genres?: MovieGenreUncheckedUpdateManyWithoutMoviesNestedInput
    productionCompanies?: ProductionCompanyUncheckedUpdateManyWithoutMoviesNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutMovieNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutMovieNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutMovieNestedInput
    directors?: PersonUncheckedUpdateManyWithoutDirectedMoviesNestedInput
    producers?: PersonUncheckedUpdateManyWithoutProducedMoviesNestedInput
    execProducers?: PersonUncheckedUpdateManyWithoutExecProducedMoviesNestedInput
    writers?: PersonUncheckedUpdateManyWithoutWrittenMoviesNestedInput
    composers?: PersonUncheckedUpdateManyWithoutComposedMoviesNestedInput
    cinematographers?: PersonUncheckedUpdateManyWithoutCinematographyMoviesNestedInput
  }

  export type MovieUncheckedUpdateManyWithoutListsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    release_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runtime?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TVShowUpdateWithoutListsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUpdateManyWithoutTVShowNestedInput
    watched?: WatchedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUpdateManyWithoutTVShowNestedInput
  }

  export type TVShowUncheckedUpdateWithoutListsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: ReviewUncheckedUpdateManyWithoutTVShowNestedInput
    watched?: WatchedUncheckedUpdateManyWithoutTVShowNestedInput
    watchlists?: WatchlistUncheckedUpdateManyWithoutTVShowNestedInput
  }

  export type TVShowUncheckedUpdateManyWithoutListsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    endYear?: NullableIntFieldUpdateOperationsInput | number | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    first_air_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}