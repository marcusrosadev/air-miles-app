import { message } from "antd";
/* eslint-disable prefer-const */

import {
  getDatabase,
  ref,
  update,
  get,
  remove,
  onValue,
  off,
  set,
} from "firebase/database";

export interface IPermissionForm {
  userName: string;
  userCpf?: string;
  userPhone: string;
  userActivePackage: any;
  userIsActive: boolean;
}

export interface IPermissionFormEdition {
  userActivePackage: any;
  userIsActive: boolean;
}

export interface IPermission {
  userId: string;
  userName: string;
  userCpf?: string;
  userPhone: string;
  userActivePackage: any;
  userIsActive: boolean;
}

// ============================================== CREATE PERMISSION

const handleCreatePermission = async (
  permissionData: IPermissionForm
): Promise<boolean> => {
  try {
    const db = getDatabase();
    const newPermissionRef = ref(db, `usersPermissions/${Date.now()}`); // Use `Date.now()` como chave única

    const newPermission = {
      userId: Date.now().toString(), // Gerar um ID único
      ...permissionData,
    };

    await set(newPermissionRef, newPermission); // Usa `set` para criar ou substituir o nó específico

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
  updatedPermissionData: IPermissionFormEdition;
}

const handleEditPermission = async ({
  permissionId,
  updatedPermissionData,
}: IEditPermissionForm): Promise<boolean> => {
  try {
    const db = getDatabase();
    const permissionsRef = ref(db, `usersPermissions`);

    const permissionSnapshot = await get(permissionsRef);

    if (!permissionSnapshot.exists()) {
      message.open({
        type: "warning",
        content: "Permissão não encontrada.",
      });
      return false;
    }

    // Transforma os dados em um array de permissões
    let permissionsObject: any = permissionSnapshot.val();
    let permissionsArray: any = Object.values(permissionsObject);

    // Encontra o índice da permissão pelo ID
    const permissionIndex = permissionsArray.findIndex(
      (perm: IPermission) => perm.userId === permissionId
    );

    if (permissionIndex === -1) {
      message.open({
        type: "warning",
        content: "Permissão não encontrada.",
      });
      return false;
    }

    // Atualiza a permissão no array
    permissionsArray[permissionIndex] = {
      ...permissionsArray[permissionIndex],
      ...updatedPermissionData,
    };

    // Converte o array de volta para objeto
    const updatedPermissionsObject = permissionsArray.reduce(
      (acc: any, permission: IPermission) => {
        acc[permission.userId] = permission;
        return acc;
      },
      {}
    );

    await update(permissionsRef, updatedPermissionsObject);

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
    const db = getDatabase();
    const permissionsRef = ref(db, `usersPermissions`);

    const permissionSnapshot = await get(permissionsRef);

    if (!permissionSnapshot.exists()) {
      message.open({
        type: "error",
        content: "A permissão que você está tentando excluir não existe.",
      });
      return false;
    }

    // Transforma o objeto de permissões em um array
    let permissionsObject: any = permissionSnapshot.val();
    let permissionsArray: any = Object.values(permissionsObject);

    // Remove a permissão do array filtrando pelo ID
    const updatedPermissionsArray = permissionsArray.filter(
      (perm: IPermission) => perm.userId !== permissionId
    );

    // Verifica se alguma permissão foi removida
    if (updatedPermissionsArray.length === permissionsArray.length) {
      message.open({
        type: "warning",
        content: "Permissão não encontrada para exclusão.",
      });
      return false;
    }

    // Converte o array atualizado de volta para objeto
    const updatedPermissionsObject = updatedPermissionsArray.reduce(
      (acc: any, permission: IPermission) => {
        acc[permission.userId] = permission;
        return acc;
      },
      {}
    );

    // Atualiza o banco de dados
    await set(permissionsRef, updatedPermissionsObject); // Use `set` para substituir todo o nó de permissões

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
  const db = getDatabase();
  const permissionsRef = ref(db, "usersPermissions");

  const listener = onValue(permissionsRef, (snapshot) => {
    try {
      if (snapshot && snapshot.exists()) {
        const permissionsArray = snapshot.val();
        callback(permissionsArray);
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
