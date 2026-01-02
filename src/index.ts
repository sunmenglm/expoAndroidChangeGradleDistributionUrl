import { withGradleProperties, type ConfigPlugin } from "@expo/config-plugins";
import fs from "node:fs";

interface WithGradleWrapperPluginProps {
  distributionUrl?: string;
}

const withGradleWrapperPlugin: ConfigPlugin<WithGradleWrapperPluginProps> = (
  expoConfig,
  { distributionUrl }
) => {
  return withGradleProperties(expoConfig, (config) => {
    const gradleWrapperPath = `${config.modRequest.platformProjectRoot}/gradle/wrapper/gradle-wrapper.properties`;

    const properties = fs.readFileSync(gradleWrapperPath, "utf8");
    if (distributionUrl) {
      // 修改 Gradle 版本
      const updated = properties.replace(
        /distributionUrl=.+/,
        `distributionUrl=${distributionUrl}`
      );

      fs.writeFileSync(gradleWrapperPath, updated);
    }

    return config;
  });
};

export default withGradleWrapperPlugin;
