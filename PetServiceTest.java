package jp.co.brightstar;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import jp.co.brightstar.mapper.PetMapper;
import jp.co.brightstar.model.Pet;
import jp.co.brightstar.service.PetService;

@SpringBootTest
class PetServiceTest {
	
	//使用 Mockito 创建 PetMapper 的 mock 对象。mock 对象用于模拟 PetMapper 的行为，而不实际调用它的真实实现。
	@Mock
	
	//定义一个私有的 PetMapper 成员变量，该变量将被 Mockito 注解为 mock 对象。
	private PetMapper petMapper;
	
	//用 Mockito 将 mock 的 PetMapper 注入到 PetService 中，创建一个 PetService 对象并将 mock 依赖注入。
	@InjectMocks
	
	//定义一个私有的 PetService 变量，这个变量将被注入 PetMapper 的 mock 对象。
	private PetService petService;
	
	//表示此方法会在每个测试方法运行之前被调用，用于执行初始化操作。
	@BeforeEach
	
	//定义了一个初始化方法 setUp，它将在每个测试方法之前运行。
	public void setUp() {
		//初始化使用 Mockito 注解（如 @Mock 和 @InjectMocks）的类对象，并创建和注入 mock 对象。
		MockitoAnnotations.openMocks(this);
	}
	
	@Test
	public void testInsertPet(){
		//创建一个 Pet 对象，设置 ID 为 "1"，名称为 "Kai"。
		Pet pet = new Pet();
		pet.setName("Kai");
		pet.setId(1);
		
		//使用 Mockito 模拟 petMapper 的 insertPet 方法行为，表示当调用 insertPet 方法时不做任何操作（避免实际执行它）。
		doNothing().when(petMapper).insertPet(pet);
		
		//调用 PetService 的 insertPet 方法并捕获返回值。
		Pet result = petService.insertPet(pet);
		
		//使用 assertEquals 断言返回的 Pet 对象与输入的 Pet 对象相等。
		assertEquals(pet, result);
		
		//验证 mock 对象的方法是否被调用。
		verify(petMapper, times(1)).insertPet(pet);
	}
	
	@Test
	public void testSearchPet() {
		List<Pet> mockPets = new ArrayList<>();
		Pet pet = new Pet();
		pet.setId(1);
		pet.setName("Kai");
		mockPets.add(pet);
		when(petMapper.searchPet()).thenReturn(mockPets);
		
		List<Pet> result = petService.searchPet();
		assertEquals(1,result.size());
		assertEquals("Kai", result.get(0).getName());
		verify(petMapper, times(1)).searchPet();
		
	}
	
	
}
