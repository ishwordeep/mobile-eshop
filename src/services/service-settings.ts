import { useStoreSettingData } from "@/store/settingStore";
import { useQuery } from "@tanstack/react-query";
import { Api } from "./service-api";
import { ApiClient } from "./service-axios";
import { useMutate } from "./service-form-methods";

export interface SettingsResponse {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  google_map?: string;
  google_password?: string;
}

const fetchSettingData = async () => {
  return ApiClient.get(Api.Settings.get);
};

const useFetchSettings = () => {
  const { setSettingData } = useStoreSettingData();

  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const settingData = await fetchSettingData();
      setSettingData(settingData?.data?.data);
      return settingData?.data;
    },

    retry: 1,
  });
};

const useUpdateSettings = () => {
  return useMutate<SettingsResponse>({
    url: Api.Settings.update,
    method: "POST",
    invalidates: ["settings"],
    message: "Settings updated successfully",
  });
};

export { useFetchSettings, useUpdateSettings };
