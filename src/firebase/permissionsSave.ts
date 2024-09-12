import {
  getDatabase,
  ref,
  push,
  update,
  child,
  get,
  remove,
  onValue,
  off,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { message } from "antd";

export interface IPermissionForm {
  userName: string;
  userCpf?: string;
  userPhone: string;
  userActivePackage: any;
  userIsActive: string;
}

// ============================================== CREATE PERMISSION

const handleCreatePermission = async (
  permissionData: IPermissionForm
): Promise<boolean> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return false;

    const db = getDatabase();
    const permissionsRef = ref(db, `userPermissions`);
    const newPermissionRef = push(permissionsRef);

    const permissionToSave = {
      id: newPermissionRef.key,
      ...permissionData,
      active: true,
    };

    await update(newPermissionRef, permissionToSave);

    message.open({
      type: "success",
      content: "Permissão criada com sucesso.",
    });

    return true;
  } catch (error: any) {
    message.open({
      type: "error",
      content: "Erro ao criar a permissão.",
    });

    return false;
  }
};

// ============================================== EDIT PERMISSION

export interface IEditPermissionForm {
  permissionId: string;
  updatedPermissionData: IPermissionForm;
}

const handleEditPermission = async ({
  permissionId,
  updatedPermissionData,
}: IEditPermissionForm): Promise<boolean> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return false;

    const db = getDatabase();
    const permissionsRef = ref(db, `userPermissions`);

    const permissionSnapshot = await get(child(permissionsRef, permissionId));

    if (!permissionSnapshot.exists()) {
      message.open({
        type: "warning",
        content: "Permissão não encontrada.",
      });
      return false;
    }

    await update(child(permissionsRef, permissionId), updatedPermissionData);

    message.open({
      type: "success",
      content: "Permissão editada com sucesso.",
    });

    return true;
  } catch (error: any) {
    message.open({
      type: "error",
      content: "Erro ao editar a permissão.",
    });

    return false;
  }
};

// ============================================== DELETE PERMISSION

const handleDeletePermission = async (
  permissionId: string
): Promise<boolean> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return false;

    const db = getDatabase();
    const permissionsRef = ref(db, `userPermissions`);

    const permissionSnapshot = await get(child(permissionsRef, permissionId));

    if (!permissionSnapshot.exists()) {
      message.open({
        type: "error",
        content: "A permissão que você está tentando excluir não existe.",
      });
      return false;
    }

    await remove(child(permissionsRef, permissionId));

    message.open({
      type: "success",
      content: "Permissão excluída com sucesso.",
    });

    return true;
  } catch (error: any) {
    message.open({
      type: "error",
      content: "Erro ao excluir a permissão.",
    });

    return false;
  }
};

// ============================================== HANDLE GET USER PERMISSION DATA

const handleGetPermissionsData = (
  callback: (accountData: IPermissionForm[] | null) => void
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    callback(null);
    return;
  }

  const db = getDatabase();
  const permissionsRef = ref(db, "userPermissions");

  const listener = onValue(permissionsRef, (snapshot) => {
    try {
      if (snapshot && snapshot.exists()) {
        const companyData = snapshot.val();
        callback(companyData);
      } else {
        callback(null);
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Falha ao obter lista de permissões",
      });
    }
  });

  return () => {
    off(permissionsRef, "value", listener);
  };
};

export {
  handleCreatePermission,
  handleEditPermission,
  handleDeletePermission,
  handleGetPermissionsData,
};
