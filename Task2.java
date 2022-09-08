package org.sample;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Task2 {

	@Test

	public void tc1() throws InterruptedException, IOException {

		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();
		driver.manage().window().maximize();

		driver.get("https://www.imdb.com/title/tt9389998/");

		System.out.println(driver.getTitle());

		Thread.sleep(3000);

		WebElement element = driver.findElement(By.xpath(
				"//a[@data-testid='author-link']//following::section[@data-cel-widget='StaticFeature_Details']"));

		// method for taking screenshot
		File s = element.getScreenshotAs(OutputType.FILE);
		File d = new File("C:\\Users\\Hi.ANISH\\eclipse-workspace\\Assignment\\src\\screenshot\\details.png");
		FileUtils.copyFile(s, d);

	}

	@Test
	public void tc2() throws InterruptedException, IOException {
		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();
		driver.manage().window().maximize();

		driver.get("https://en.wikipedia.org/wiki/Pushpa:_The_Rise");

		System.out.println(driver.getTitle());

		Thread.sleep(3000);

		WebElement element1 = driver.findElement(By.xpath("//*[@id=\"mw-content-text\"]/div[1]/p[4]"));

		// method for taking screenshot
		File s1 = element1.getScreenshotAs(OutputType.FILE);
		File d1 = new File("C:\\Users\\Hi.ANISH\\eclipse-workspace\\Assignment\\src\\screenshot\\wikidetails.png");
		FileUtils.copyFile(s1, d1);

	}

}
