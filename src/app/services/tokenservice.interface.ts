// Copyright ragonzalz@distroot.org. 2020. All Rights Reserved.
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
export interface TokenServiceInterface {
  
    signOut(): void;
    saveToken(token: string): void;
    isLogin(): boolean;
    getToken(): string;
}