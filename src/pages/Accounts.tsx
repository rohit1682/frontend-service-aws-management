import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    AlertTriangle,
    Building2,
    MapPin
} from 'lucide-react';
import { useAccounts } from '../hooks/useAccounts';
import type { Account } from '../constants/accounts';
import { formatRegions } from '../lib/utils';
import AccountForm from '../components/forms/AccountForm';
import toast, { Toaster } from 'react-hot-toast';

// Skeleton Component
const AccountCardSkeleton = () => (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg animate-pulse">
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/4"></div>
            </div>
        </div>
    </div>
);

// Simple Image Component that shows account initials
const AccountImage: React.FC<{
    account: Account;
}> = memo(({ account }) => {
    // For now, just show initials since we don't have image URLs in mock data
    return (
        <div className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-lg bg-slate-800">
            {account.AccountName.charAt(0).toUpperCase()}
        </div>
    );
});

AccountImage.displayName = 'AccountImage';

// Account Card Component
const AccountCard: React.FC<{
    account: Account;
    onEdit: (account: Account) => void;
    onDelete: (account: Account) => void;
}> = memo(({ account, onEdit, onDelete }) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        <AccountImage account={account} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{account.AccountName}</h3>
                        <div className="flex items-center text-sm text-slate-600 mb-1">
                            <Building2 className="w-4 h-4 mr-1" />
                            ID: {account.AccountID}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {account.ActiveRegions ? formatRegions(account.ActiveRegions) : 'No regions specified'}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onEdit(account)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(account)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

AccountCard.displayName = 'AccountCard';

// Delete Confirmation Dialog
const DeleteConfirmDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    account: Account | null;
}> = ({ isOpen, onClose, onConfirm, account }) => {
    if (!isOpen || !account) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-8 w-full max-w-md"
            >
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Delete Account</h2>
                    <p className="text-slate-600 mb-6">
                        Are you sure you want to delete <strong>{account.AccountName}</strong>?
                        This action cannot be undone.
                    </p>
                    <div className="flex space-x-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Main Accounts Component
const Accounts: React.FC = () => {
    const {
        filteredAccounts,
        isLoading,
        search,
        setSearch,
        totalCount,
        addAccount,
        updateAccount,
        deleteAccount
    } = useAccounts();

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    const handleCreate = async (accountData: {
        accountName: string;
        accountId: string;
        activeRegions: string[];
        logoFile?: File;
    }) => {
        try {
            addAccount({
                AccountID: accountData.accountId,
                AccountName: accountData.accountName,
                ActiveRegions: JSON.stringify(accountData.activeRegions),
                Status: 'Active'
            });
            toast.success('Account created successfully!');
            setIsCreateDialogOpen(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
            toast.error(errorMessage);
            throw error; // Re-throw so the form can handle it
        }
    };

    const handleUpdate = async (accountData: {
        accountName: string;
        accountId: string;
        activeRegions: string[];
        logoFile?: File;
    }) => {
        if (!selectedAccount) {
            return;
        }

        try {
            updateAccount(selectedAccount.AccountID, {
                AccountName: accountData.accountName,
                ActiveRegions: JSON.stringify(accountData.activeRegions)
            });
            toast.success('Account updated successfully!');
            setIsEditDialogOpen(false);
            setSelectedAccount(null);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update account';
            toast.error(errorMessage);
            throw error; // Re-throw so the form can handle it
        }
    };

    const handleDelete = async () => {
        if (!selectedAccount) {
            return;
        }

        try {
            deleteAccount(selectedAccount.AccountID);
            toast.success('Account deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete account');
        } finally {
            setIsDeleteDialogOpen(false);
            setSelectedAccount(null);
        }
    };

    const handleEdit = (account: Account) => {
        setSelectedAccount(account);
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (account: Account) => {
        setSelectedAccount(account);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div className="w-full bg-slate-50 min-h-screen">
            <Toaster position="top-right" />
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="w-full space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                                    Account Management
                                </h1>
                                <p className="text-lg text-slate-600">
                                    Manage your AWS managed services accounts
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCreateDialogOpen(true)}
                                className="mt-4 sm:mt-0 bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition-colors flex items-center space-x-2"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Account</span>
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search accounts by name, ID, or region..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="mt-4 text-sm text-slate-600">
                            Showing {filteredAccounts.length} of {totalCount} accounts
                        </div>
                    </div>

                    {/* Accounts List */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <AccountCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredAccounts.length === 0 ? (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
                                <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Accounts Found</h3>
                                <p className="text-slate-600 mb-4">
                                    {search
                                        ? 'No accounts match your search criteria.'
                                        : 'Get started by creating your first account.'
                                    }
                                </p>
                                {!search && (
                                    <button
                                        onClick={() => setIsCreateDialogOpen(true)}
                                        className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-900 transition-colors"
                                    >
                                        Create Account
                                    </button>
                                )}
                            </div>
                        ) : (
                            <AnimatePresence>
                                {filteredAccounts.map((account, index) => (
                                    <AccountCard
                                        key={`${account.AccountID}-${index}`}
                                        account={account}
                                        onEdit={handleEdit}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            <AccountForm
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onSubmit={handleCreate}
                title="Create New Account"
                mode="create"
            />

            <AccountForm
                isOpen={isEditDialogOpen}
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setSelectedAccount(null);
                }}
                onSubmit={handleUpdate}
                account={selectedAccount || undefined}
                title="Update Account"
                mode="update"
            />

            <DeleteConfirmDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedAccount(null);
                }}
                onConfirm={handleDelete}
                account={selectedAccount}
            />
        </div>
    );
};

export default Accounts;


