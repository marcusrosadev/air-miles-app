/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import * as S from "./styles";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  handleCreatePermission,
  handleDeletePermission,
  handleEditPermission,
  handleGetPermissionsData,
  IPermission,
  IPermissionForm,
  IPermissionFormEdition,
} from "../../firebase/permissions";

const Permissions = () => {
  const [permissionToEdit, setPermissionToEdit] = useState<IPermission | null>(
    null
  );
  const [permissionToDeleteId, setPermissionToDeleteId] = useState<
    string | null
  >(null);

  const [createPermissionModalOpened, setCreatePermissionModalOpened] =
    useState(false);
  const [editPermissionModalOpened, setEditPermissionModalOpened] =
    useState(false);
  const [deletePermissionModalOpened, setDeletePermissionModalOpened] =
    useState(false);

  const openCreatePermissionModal = () => {
    setCreatePermissionModalOpened(true);
  };

  const closeCreatePermissionModal = () => {
    setCreatePermissionModalOpened(false);
  };

  const openEditPermissionModal = (permissionId: IPermission) => {
    setEditPermissionModalOpened(true);
    setPermissionToEdit(permissionId);
  };

  const closeEditPermissionModal = () => {
    setEditPermissionModalOpened(false);
    setPermissionToEdit(null);
  };

  const openDeletePermissionModal = (permissionId: string) => {
    setDeletePermissionModalOpened(true);
    setPermissionToDeleteId(permissionId);
  };

  const closeDeletePermissionModal = () => {
    setDeletePermissionModalOpened(false);
    setPermissionToDeleteId(null);
  };

  const [permissionsData, setPermissionsData] = useState<
    IPermissionForm[] | null
  >(null);

  const [activeView, setActiveView] = useState<"users" | "permissions">(
    "permissions"
  );

  useEffect(() => {
    const unsubscribe = handleGetPermissionsData((permissionsData) => {
      setPermissionsData(permissionsData);
    });

    if (unsubscribe) {
      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <>
      <S.PermissionsPage>
        <S.PermissionsPageHeader>
          <h1>Permissões</h1>
          <p>Esta é a tela de permissões.</p>
        </S.PermissionsPageHeader>
        <S.PermissionsPageContent>
          <S.PermissionsListOptions>
            <S.PermissionsListNavigation>
              <Button
                variant={
                  activeView !== "permissions" ? "contained" : "outlined"
                }
                onClick={() => setActiveView("permissions")}
              >
                Permissões
              </Button>
            </S.PermissionsListNavigation>
            <S.PermissionsListNavigationOptions>
              {activeView === "permissions" && (
                <>
                  <Button
                    variant="contained"
                    onClick={openCreatePermissionModal}
                  >
                    Nova Permissão
                  </Button>
                </>
              )}
            </S.PermissionsListNavigationOptions>
          </S.PermissionsListOptions>
          <S.PermissionsListHeader>
            <S.ListHeaderLabel>Nome do usuário</S.ListHeaderLabel>
            <S.ListHeaderLabel>CPF</S.ListHeaderLabel>
            <S.ListHeaderLabel>Telefone</S.ListHeaderLabel>
            <S.ListHeaderLabel>Pacote ativo</S.ListHeaderLabel>
            <S.ListHeaderLabel>Ativo?</S.ListHeaderLabel>
            <S.ListHeaderLabel></S.ListHeaderLabel>
          </S.PermissionsListHeader>
          <S.PermissionsList>
            <>
              {permissionsData &&
                Object.values(permissionsData).map((permission: any) => (
                  <S.PermissionCard key={permission.userId}>
                    <S.PermissionCardLabel>
                      {permission.userName}
                    </S.PermissionCardLabel>
                    <S.PermissionCardLabel>
                      {permission.userCpf}
                    </S.PermissionCardLabel>
                    <S.PermissionCardLabel>
                      {permission.userPhone}
                    </S.PermissionCardLabel>
                    <S.PermissionCardLabel>
                      {permission.userActivePackage}
                    </S.PermissionCardLabel>
                    <S.PermissionCardLabel>
                      {permission.userIsActive ? "Sim" : "Não"}
                    </S.PermissionCardLabel>
                    <S.PermissionCardOptions>
                      <S.Option
                        onClick={() => openEditPermissionModal(permission)}
                      >
                        <FiEdit />
                      </S.Option>
                      <S.Option
                        onClick={() =>
                          openDeletePermissionModal(permission.userId)
                        }
                      >
                        <FiTrash2 />
                      </S.Option>
                    </S.PermissionCardOptions>
                  </S.PermissionCard>
                ))}
            </>
          </S.PermissionsList>
        </S.PermissionsPageContent>
      </S.PermissionsPage>

      <Dialog
        open={createPermissionModalOpened}
        onClose={closeCreatePermissionModal}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            console.log(formJson);

            const formFormattedData: IPermissionForm = {
              userName: formJson.name,
              userCpf: formJson.cpf,
              userPhone: formJson.phone,
              userActivePackage: formJson.activePackage,
              userIsActive: formJson.isActive === "on" ? true : false,
            };

            const permissionCreationResponse = await handleCreatePermission(
              formFormattedData
            );

            if (permissionCreationResponse) {
              closeCreatePermissionModal();

              return;
            }
          },
        }}
      >
        <DialogTitle>Nova Permissão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha o formulário abaixo para criar uma nova permissão
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome do usuário"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="cpf"
            name="cpf"
            label="CPF"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Número de telefone"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="activePackage"
            name="activePackage"
            label="Nome do pacote ativo"
            type="text"
            fullWidth
            variant="standard"
          />

          <FormControlLabel
            style={{ marginTop: 12 }}
            required
            id="isActive"
            name="isActive"
            control={<Switch />}
            label="Inicialmente ativo?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreatePermissionModal}>Cancelar</Button>
          <Button type="submit">Criar Permissão</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editPermissionModalOpened}
        onClose={closeEditPermissionModal}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            console.log(formJson);

            const formFormattedData: IPermissionFormEdition = {
              userActivePackage: formJson.activePackage,
              userIsActive: formJson.isActive === "on" ? true : false,
            };

            if (!permissionToEdit) {
              closeEditPermissionModal();
              return;
            }

            const permissionEditionResponse = await handleEditPermission({
              permissionId: permissionToEdit?.userId,
              updatedPermissionData: formFormattedData,
            });

            if (permissionEditionResponse) {
              closeEditPermissionModal();

              return;
            }
          },
        }}
      >
        <DialogTitle>Editar Permissão</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="activePackage"
            name="activePackage"
            label="Nome do pacote ativo"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={permissionToEdit?.userActivePackage}
          />

          <FormControlLabel
            style={{ marginTop: 12 }}
            id="isActive"
            name="isActive"
            control={<Switch defaultChecked={permissionToEdit?.userIsActive} />}
            label="Inicialmente ativo?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditPermissionModal}>Cancelar</Button>
          <Button type="submit">Editar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deletePermissionModalOpened}
        onClose={closeDeletePermissionModal}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!permissionToDeleteId) {
              closeDeletePermissionModal();
              return;
            }

            const permissionDeletionResponse = await handleDeletePermission(
              permissionToDeleteId
            );

            if (permissionDeletionResponse) {
              closeDeletePermissionModal();

              return;
            }
          },
        }}
      >
        <DialogTitle>Editar Permissão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir essa permissão?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeletePermissionModal}>Cancelar</Button>
          <Button type="submit">Sim</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Permissions;
