import { useState, useEffect, useCallback, useMemo } from 'react';
import { MOCK_ACCOUNTS, TOTAL_ACCOUNTS_COUNT } from '../constants/accounts';
import type { Account } from '../constants/accounts';

export interface UseAccountsReturn {
    accounts: Account[];
    isLoading: boolean;
    search: string;
    setSearch: (search: string) => void;
    filteredAccounts: Account[];
    totalCount: number;
    addAccount: (account: Omit<Account, 'CreatedAt' | 'UpdatedAt'>) => void;
    updateAccount: (accountId: string, updates: Partial<Account>) => void;
    deleteAccount: (accountId: string) => void;
}

export const useAccounts = (): UseAccountsReturn => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    // Simulate loading delay like a real API
    useEffect(() => {
        const timer = setTimeout(() => {
            setAccounts(MOCK_ACCOUNTS);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Memoize search filtering to prevent unnecessary recalculations
    const filteredAccounts = useMemo(() => {
        return accounts.filter(account => {
            if (search === '') return true;

            const accountName = account.AccountName || '';
            const activeRegions = account.ActiveRegions || '';
            const accountId = String(account.AccountID || '');

            const matches = accountName.toLowerCase().includes(search.toLowerCase()) ||
                accountId.includes(search) ||
                activeRegions.toLowerCase().includes(search.toLowerCase());

            return matches;
        });
    }, [accounts, search]);

    const addAccount = useCallback((newAccount: Omit<Account, 'CreatedAt' | 'UpdatedAt'>) => {
        // Check for duplicate account ID
        const existingAccount = accounts.find(acc => acc.AccountID === newAccount.AccountID);
        if (existingAccount) {
            throw new Error(`Account with ID ${newAccount.AccountID} already exists`);
        }

        const account: Account = {
            ...newAccount,
            CreatedAt: new Date().toISOString(),
            UpdatedAt: new Date().toISOString(),
            Status: 'Active'
        };
        setAccounts(prev => [account, ...prev]);
    }, [accounts]);

    const updateAccount = useCallback((accountId: string, updates: Partial<Account>) => {
        setAccounts(prev => prev.map(account => 
            account.AccountID === accountId 
                ? { ...account, ...updates, UpdatedAt: new Date().toISOString() }
                : account
        ));
    }, []);

    const deleteAccount = useCallback((accountId: string) => {
        setAccounts(prev => prev.filter(account => account.AccountID !== accountId));
    }, []);

    return {
        accounts,
        isLoading,
        search,
        setSearch,
        filteredAccounts,
        totalCount: TOTAL_ACCOUNTS_COUNT,
        addAccount,
        updateAccount,
        deleteAccount,
    };
};